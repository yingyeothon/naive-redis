import NaiveSocket, { ConnectionState } from "@yingyeothon/naive-socket";

import redisAuth from "./auth";

interface ConnectionInfo {
  host: string;
  port?: number;
  password?: string;
  timeoutMillis?: number;
}

export interface RedisConnection {
  socket: NaiveSocket;
  timeoutMillis: number;
  authenticated?: Promise<boolean>;
}

export default function redisConnect({
  host,
  port = 6379,
  password,
  timeoutMillis = 1000,
}: ConnectionInfo): RedisConnection {
  const socket = new NaiveSocket({
    host,
    port,
    onConnectionStateChanged: ({ state }) => {
      if (password && state === ConnectionState.Connected) {
        connection.authenticated = redisAuth(connection, password);
      }
    },
  });
  const connection: RedisConnection = {
    socket,
    timeoutMillis,
  };
  return connection;
}
