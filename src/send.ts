import TextMatch, { withMatch } from "@yingyeothon/naive-socket/lib/match";

import { IRedisConnection } from "./connection";

const newline = `\r\n`;

export interface ISend<T> {
  connection: IRedisConnection;
  commands: string[];
  match: (m: TextMatch) => TextMatch;
  transform: (result: string[]) => T;
  urgent?: boolean;
}

export default function send<T>({
  connection,
  commands,
  match,
  transform,
  urgent,
}: ISend<T>): Promise<T> {
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
