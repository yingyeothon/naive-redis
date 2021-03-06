import { RedisConnection } from "./connection";
import singleCount from "./exchange/singleCount";

export default function redisSadd(
  connection: RedisConnection,
  key: string,
  ...values: string[]
): Promise<number> {
  return singleCount(connection, [
    `SADD "${key}" ${values.map((value) => JSON.stringify(value)).join(" ")}`,
  ]);
}
