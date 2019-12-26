import { RedisConnection } from "./connection";
import { ensureGet } from "./utils";

export default async function get(conn: RedisConnection, key: string) {
  const result = await conn.send([`GET "${key}"`], m => {
    m.capture(`\r\n`);
    return m.value(0) === "$-1" || m.value(0).startsWith("-")
      ? m
      : m.capture(`\r\n`);
  });
  const length = ensureGet(result, 0);
  return length === "$-1" ? null : result[1];
}
