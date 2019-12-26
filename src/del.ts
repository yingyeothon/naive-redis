import { RedisConnection } from "./connection";
import { ensureValue } from "./utils";

export default async function del(conn: RedisConnection, ...keys: string[]) {
  const result = await conn.send(
    [`DEL ${keys.map(e => `"${e}"`).join(" ")}`],
    m => m.capture(`\r\n`)
  );
  const count = ensureValue(result, 0, /:([0-9]+)/);
  return +count;
}
