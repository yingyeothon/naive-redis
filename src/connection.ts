import NaiveSocket, { ConnectionState } from "@yingyeothon/naive-socket";

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
  timeoutMillis = 1000,
}: IConnectionInfo): IRedisConnection {
  const socket = new NaiveSocket({
    host,
    port,
    onConnectionStateChanged: ({ state }) => {
      if (password && state === ConnectionState.Connected) {
        connection.authenticated = auth(connection, password);
      }
    },
  });
  const connection: IRedisConnection = {
    socket,
    timeoutMillis,
  };
  return connection;
}
