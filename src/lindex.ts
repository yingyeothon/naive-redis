import { RedisConnection } from "./connection";
import singleGet from "./exchange/singleGet";

export default function redisLindex(
  connection: RedisConnection,
  key: string,
  pos: number
): Promise<string | null> {
  return singleGet(connection, [`LINDEX "${key}" ${pos}`]);
}
