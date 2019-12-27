import { RedisConnection } from "./connection";
import singleGet, { match } from "./response/singleGet";

export default async function get(conn: RedisConnection, key: string) {
  const result = await conn.send([`GET "${key}"`], match);
  return singleGet(result);
}
