import { RedisConnection } from "./connection";
import singleGet, { match } from "./response/singleGet";

export default async function lpop(conn: RedisConnection, key: string) {
  const result = await conn.send([`LPOP "${key}"`], match);
  return singleGet(result);
}
