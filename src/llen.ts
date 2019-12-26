import { RedisConnection } from "./connection";
import { ensureValue } from "./utils";

export default async function llen(conn: RedisConnection, key: string) {
  const result = await conn.send([`llen "${key}"`], m => m.capture(`\r\n`));
  return +ensureValue(result, 0, /:([0-9]+)/);
}
