import { RedisConnection } from "../connection";
import ensureValue from "./ensureValue";
import redisSend from "../send";

export default function singleGet(
  connection: RedisConnection,
  commands: string[]
): Promise<string | null> {
  return redisSend({
    connection,
    commands,
    match: (m) => {
      m.capture(`\r\n`);
      const first = m.values()[0];
      return first === "$-1" || first.startsWith("-") ? m : m.capture(`\r\n`);
    },
    transform: (result) => {
      const length = ensureValue(result, 0, /\$(-?[0-9]+)/);
      return length === "-1" ? null : result[1];
    },
  });
}
