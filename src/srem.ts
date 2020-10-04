import { RedisConnection } from "./connection";
import singleCount from "./exchange/singleCount";

export default function redisSrem(
  connection: RedisConnection,
  key: string,
  ...values: string[]
): Promise<number> {
  return singleCount(connection, [
    `SREM "${key}" ${values.map((value) => JSON.stringify(value)).join(" ")}`,
  ]);
}
