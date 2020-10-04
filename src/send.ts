import TextMatch, { withMatch } from "@yingyeothon/naive-socket/lib/match";

import { RedisConnection } from "./connection";

const newline = `\r\n`;

export interface Send<T> {
  connection: RedisConnection;
  commands: string[];
  match: (m: TextMatch) => TextMatch;
  transform: (result: string[]) => T;
  urgent?: boolean;
}

export default function redisSend<T>({
  connection,
  commands,
  match,
  transform,
  urgent,
}: Send<T>): Promise<T> {
  async function doSend() {
    const response = await connection.socket.send({
      message: commands.join(newline) + newline,
      fulfill: withMatch(match),
      timeoutMillis: connection.timeoutMillis,
      urgent: urgent,
    });
    return transform(match(new TextMatch(response)).values());
  }
  return connection.authenticated
    ? connection.authenticated.then((success) => {
        if (!success) {
          throw new Error(`Invalid password`);
        }
        return doSend();
      })
    : doSend();
}
