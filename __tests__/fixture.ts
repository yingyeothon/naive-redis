import connect, { IRedisConnection } from "../src/connection";

const redisHost = `localhost`;
const redisPassword = ``;

export default function fixture(
  testName: string,
  connectionWork: (connection: IRedisConnection) => Promise<void>
) {
  test(testName, async () => {
    const connection = connect({
      host: redisHost,
      password: redisPassword,
    });
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
