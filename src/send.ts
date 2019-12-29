import Matcher, { withMatcher } from "@yingyeothon/naive-socket/lib/match";
import { IRedisConnection } from "./connection";

const newline = `\r\n`;

export interface ISend<T> {
  connection: IRedisConnection;
  commands: string[];
  match: (m: Matcher) => Matcher;
  transform: (result: string[]) => T;
}

export default function send<T>({
  connection,
  commands,
  match,
  transform
}: ISend<T>): Promise<T> {
  function doSend() {
    return connection.socket
      .send({
        message: commands.join(newline) + newline,
        fulfill: withMatcher(match),
        timeoutMillis: connection.timeoutMillis
      })
      .then(response => transform(match(new Matcher(response)).values()));
  }
  return connection.authenticated
    ? connection.authenticated.then(success => {
        if (!success) {
          throw new Error(`Invalid password`);
        }
        return doSend();
      })
    : doSend();
}
