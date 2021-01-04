import { RedisConnection } from "./connection";
import singleCount from "./exchange/singleCount";

export default function redisDel(
  connection: RedisConnection,
  ...keys: string[]
): Promise<number> {
  return singleCount(connection, [
    `DEL ${keys.map((e) => `"${e}"`).join(" ")}`,
  ]);
}
