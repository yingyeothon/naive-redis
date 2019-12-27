import { RedisConnection } from "./connection";
import multipleGet, { match } from "./response/multipleGet";

export default async function lrange(
  conn: RedisConnection,
  key: string,
  start: number,
  end: number
) {
  const result = await conn.send([`LRANGE "${key}" ${start} ${end}`], match);
  return multipleGet(result);
}
