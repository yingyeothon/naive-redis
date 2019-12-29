import NaiveSocket from "@yingyeothon/naive-socket";
import ok from "./exchange/ok";

interface IConnectionInfo {
  host: string;
  port?: number;
  password?: string;
  timeoutMillis?: number;
}

export interface IRedisConnection {
  socket: NaiveSocket;
  timeoutMillis: number;
}

export default function connect({
  host,
  port = 6379,
  password,
  timeoutMillis = 1000
}: IConnectionInfo): Promise<IRedisConnection> {
  const socket = new NaiveSocket({
    host,
    port
  });
  const connection: IRedisConnection = {
    socket,
    timeoutMillis
  };
  return password
    ? ok(connection, [`AUTH ${password}`]).then(success => {
        if (!success) {
          throw new Error(`Invalid password`);
        }
        return connection;
      })
    : Promise.resolve(connection);
}
