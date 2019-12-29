import { IRedisConnection } from "../connection";
import send from "../send";
import ensureValue from "./ensureValue";

export default function singleGet(
  connection: IRedisConnection,
  commands: string[]
) {
  return send({
    connection,
    commands,
    match: m => {
      m.capture(`\r\n`);
      return m.value(0) === "$-1" || m.value(0).startsWith("-")
        ? m
        : m.capture(`\r\n`);
    },
    transform: result => {
      const length = ensureValue(result, 0, /\$(-?[0-9]+)/);
      return length === "-1" ? null : result[1];
    }
  });
}
