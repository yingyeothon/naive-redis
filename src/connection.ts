import NaiveSocket from "@yingyeothon/naive-socket";
import auth from "./auth";

interface IConnectionInfo {
  host: string;
  port?: number;
  password?: string;
  timeoutMillis?: number;
}

export interface IRedisConnection {
  socket: NaiveSocket;
  timeoutMillis: number;
  authenticated?: Promise<boolean>;
}

export default function connect({
  host,
  port = 6379,
  password,
  timeoutMillis = 1000
}: IConnectionInfo): IRedisConnection {
  const socket = new NaiveSocket({
    host,
    port
  });
  const connection: IRedisConnection = {
    socket,
    timeoutMillis
  };
  if (password) {
    connection.authenticated = auth(connection, password);
  }
  return connection;
}
