import { RedisConnection } from "./connection";
import singleCount from "./exchange/singleCount";

export default function del(connection: RedisConnection, ...keys: string[]) {
  return singleCount(connection, [
    `DEL ${keys.map((e) => `"${e}"`).join(" ")}`,
  ]);
}
