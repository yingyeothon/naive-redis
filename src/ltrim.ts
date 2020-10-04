import { RedisConnection } from "./connection";
import ok from "./exchange/ok";

export default function redisLtrim(
  connection: RedisConnection,
  key: string,
  start: number,
  end = -1
): Promise<boolean> {
  return ok(connection, [`LTRIM "${key}" ${start} ${end}`]);
}
