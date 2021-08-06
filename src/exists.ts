import { RedisConnection } from "./connection";
import singleCount from "./exchange/singleCount";

export default function redisExists(
  connection: RedisConnection,
  ...keys: string[]
): Promise<number> {
  return singleCount(connection, [
    `EXISTS ${keys.map((e) => `"${e}"`).join(" ")}`,
  ]);
}
