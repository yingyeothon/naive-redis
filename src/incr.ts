import { RedisConnection } from "./connection";
import singleCount from "./exchange/singleCount";

export default function redisIncr(
  connection: RedisConnection,
  key: string
): Promise<number> {
  return singleCount(connection, [`INCR "${key}"`]);
}
