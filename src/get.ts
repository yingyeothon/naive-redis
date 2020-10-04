import { RedisConnection } from "./connection";
import singleGet from "./exchange/singleGet";

export default function redisGet(
  connection: RedisConnection,
  key: string
): Promise<string | null> {
  return singleGet(connection, [`GET "${key}"`]);
}
