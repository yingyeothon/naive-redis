import { RedisConnection } from "./connection";
import { ensureGet } from "./utils";

export default async function lrange(
  conn: RedisConnection,
  key: string,
  start: number,
  end: number
) {
  const result = await conn.send([`LRANGE "${key}" ${start} ${end}`], m => {
    m.capture(`\r\n`);
    const count = m.value(0);
    if (!count || count === "$-1" || count.startsWith("-")) {
      return m;
    }
    return m.loop(0, () => m.capture(`\r\n`).capture(`\r\n`));
  });
  ensureGet(result, 0);
  return result.filter((_, i) => i !== 0 && i % 2 === 0);
}
