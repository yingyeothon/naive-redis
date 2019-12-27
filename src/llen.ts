import { RedisConnection } from "./connection";
import singleCount, { match } from "./response/singleCount";

export default async function llen(conn: RedisConnection, key: string) {
  const result = await conn.send([`llen "${key}"`], match);
  return singleCount(result);
}
