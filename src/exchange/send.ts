import Matcher, { withMatcher } from "@yingyeothon/naive-socket/lib/match";
import { IRedisConnection } from "../connection";

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
  const message = commands.join(newline) + newline;
  return connection.socket
    .send({
      message,
      fulfill: withMatcher(match),
      timeoutMillis: connection.timeoutMillis
    })
    .then(response => transform(match(new Matcher(response)).values()));
}
