import { RedisConnection } from "./connection";
import singleCount from "./exchange/singleCount";

export default function redisRpush(
  connection: RedisConnection,
  key: string,
  ...values: string[]
): Promise<number> {
  return singleCount(connection, [
    `RPUSH "${key}" ${values.map((value) => JSON.stringify(value)).join(" ")}`,
  ]);
}
