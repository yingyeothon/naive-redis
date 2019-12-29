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
      password: redisPassword
    });
    try {
      await connectionWork(connection);
    } finally {
      connection.socket.disconnect();
    }
  });
}
