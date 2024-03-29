import connect, { RedisConfig, RedisConnection } from "../src/connection";

import { GenericContainer } from "testcontainers";

async function prepareRedis() {
  jest.setTimeout(30 * 1000);

  const password = `1234`;
  const [simpleContainer, authContainer] = await Promise.all([
    new GenericContainer("redis").withExposedPorts(6379).start(),
    new GenericContainer("redis")
      .withExposedPorts(6379)
      .withCommand(["redis-server", "--requirepass", password])
      .start(),
  ]);

  async function stopAllContainers() {
    await Promise.all([simpleContainer.stop(), authContainer.stop()]);
  }

  return {
    simple: {
      host: simpleContainer.getHost(),
      port: simpleContainer.getMappedPort(6379),
    },
    auth: {
      host: authContainer.getHost(),
      port: authContainer.getMappedPort(6379),
      password,
    },
    stopAllContainers,
  };
}

const redis = prepareRedis();

afterAll(async () => {
  const { stopAllContainers } = await redis;
  await stopAllContainers();
});

export function testbed(
  testName: string,
  testWork: (connection: RedisConfig) => Promise<void>
): void {
  test(testName + "-on-simple-container", async () => {
    const {
      simple: { host, port },
    } = await redis;
    await testWork({ host, port });
  });
  test(testName + "-on-auth-container", async () => {
    const {
      auth: { host, port, password },
    } = await redis;
    await testWork({ host, port, password });
  });
}

export default function fixture(
  testName: string,
  connectionWork: (connection: RedisConnection) => Promise<void>
): void {
  testbed(testName, async (config) => {
    const connection = connect(config);
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
