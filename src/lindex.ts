import { RedisConnection } from "./connection";
import singleGet, { match } from "./response/singleGet";

export default async function lindex(
  conn: RedisConnection,
  key: string,
  pos: number
) {
  const result = await conn.send([`LINDEX "${key}" ${pos}`], match);
  return singleGet(result);
}
