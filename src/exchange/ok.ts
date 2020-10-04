import { RedisConnection } from "../connection";
import ensureValue from "./ensureValue";
import redisSend from "../send";

export default function ok(
  connection: RedisConnection,
  commands: string[],
  { urgent }: { urgent?: boolean } = {}
): Promise<boolean> {
  return redisSend({
    connection,
    commands,
    match: (m) => m.capture(`\r\n`),
    transform: (result) => ensureValue(result, 0, /\+(OK)/) === "OK",
    urgent,
  });
}
