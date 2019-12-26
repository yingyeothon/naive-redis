import NaiveSocket from "@yingyeothon/naive-socket";
import Matcher, { withMatcher } from "@yingyeothon/naive-socket/lib/match";
import { ensureGet } from "./utils";

interface IConnectionInfo {
  host: string;
  port?: number;
  password?: string;
}

type Unpromisify<T> = T extends Promise<infer U> ? U : T;
export type RedisConnection = Unpromisify<ReturnType<typeof connect>>;

export default async function connect({
  host,
  port = 6379,
  password
}: IConnectionInfo) {
  const socket = new NaiveSocket({
    host,
    port
  });
  const newline = `\r\n`;
  const send = (
    commands: string[],
    m: (m: Matcher) => Matcher,
    timeoutMillis: number = 1000
  ): Promise<string[]> =>
    socket
      .send({
        message: commands.join(newline) + newline,
        fulfill: withMatcher(m),
        timeoutMillis
      })
      .then(response => m(new Matcher(response)).values());

  if (password) {
    const result = await send([`AUTH ${password}`], m => m.capture(newline));
    if (ensureGet(result, 0) !== "+OK") {
      throw new Error(`Password error: ${result}`);
    }
  }
  return { send, disconnect: socket.disconnect };
}
