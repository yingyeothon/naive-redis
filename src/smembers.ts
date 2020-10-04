import { RedisConnection } from "./connection";
import multipleGet from "./exchange/multipleGet";

export default function redisSmembers(
  connection: RedisConnection,
  key: string
): Promise<string[]> {
  return multipleGet(connection, [`SMEMBERS "${key}"`]);
}
