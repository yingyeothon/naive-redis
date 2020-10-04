import { RedisConnection } from "./connection";
import multipleGet from "./exchange/multipleGet";

export default function redisLrange(
  connection: RedisConnection,
  key: string,
  start: number,
  end = -1
): Promise<string[]> {
  return multipleGet(connection, [`LRANGE "${key}" ${start} ${end}`]);
}
