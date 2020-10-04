import connect, { RedisConnection } from "../src/connection";

import { GenericContainer } from "testcontainers";

async function prepareRedis() {
  const password = `1234`;
  const [simpleContainer, authContainer] = await Promise.all([
    new GenericContainer("redis").withExposedPorts(6379).start(),
    new GenericContainer("redis")
      .withExposedPorts(6379)
      .withCmd(["redis-server", "--requirepass", password])
      .start(),
  ]);

  async function stopAllContainers() {
    await Promise.all([simpleContainer.stop(), authContainer.stop()]);
  }

  return {
    simple: {
      host: simpleContainer.getContainerIpAddress(),
      port: simpleContainer.getMappedPort(6379),
    },
    auth: {
      host: authContainer.getContainerIpAddress(),
      port: authContainer.getMappedPort(6379),
      password,
    },
    stopAllContainers,
  };
}

const redis = prepareRedis();

afterAll(async () => {
  const { stopAllContainers: stopContainer } = await redis;
  await stopContainer();
});

export default function fixture(
  testName: string,
  connectionWork: (connection: RedisConnection) => Promise<void>
): void {
  test(testName + "-on-simple-container", async () => {
    const {
      simple: { host, port },
    } = await redis;
    const connection = connect({ host, port });
    try {
      await connectionWork(connection);
    } catch (error) {
      console.error("Uncaught error", error);
      throw error;
    } finally {
      // Clear all entries after test.
      await connection.socket.send({
        message: "FLUSHALL\r\n",
        fulfill: "+OK\r\n".length,
        timeoutMillis: 1000,
      });
      connection.socket.disconnect();
    }
  });

  test(testName + "-on-auth-container", async () => {
    const {
      auth: { host, port, password },
    } = await redis;
    const connection = connect({ host, port, password });
    try {
      await connectionWork(connection);
    } catch (error) {
      console.error("Uncaught error", error);
      throw error;
    } finally {
      // Clear all entries after test.
      await connection.socket.send({
        message: "FLUSHALL\r\n",
        fulfill: "+OK\r\n".length,
        timeoutMillis: 1000,
      });
      connection.socket.disconnect();
    }
  });
}
