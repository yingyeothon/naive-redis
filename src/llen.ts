import { RedisConnection } from "./connection";
import singleCount from "./exchange/singleCount";

export default function redisLlen(
  connection: RedisConnection,
  key: string
): Promise<number> {
  return singleCount(connection, [`LLEN "${key}"`]);
}
