import { RedisConnection } from "./connection";
import singleGet from "./exchange/singleGet";

export default function redisLpop(
  connection: RedisConnection,
  key: string
): Promise<string | null> {
  return singleGet(connection, [`LPOP "${key}"`]);
}
