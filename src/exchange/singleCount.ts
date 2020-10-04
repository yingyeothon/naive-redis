import { RedisConnection } from "../connection";
import ensureValue from "./ensureValue";
import redisSend from "../send";

export default function singleCount(
  connection: RedisConnection,
  commands: string[]
): Promise<number> {
  return redisSend({
    connection,
    commands,
    match: (m) => m.capture(`\r\n`),
    transform: (result) => +ensureValue(result, 0, /:([0-9]+)/),
  });
}
