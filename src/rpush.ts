import { RedisConnection } from "./connection";
import { ensureValue } from "./utils";

export default async function rpush(
  conn: RedisConnection,
  key: string,
  ...values: string[]
) {
  const result = await conn.send([`RPUSH "${key}" ${values.join(" ")}`], m =>
    m.capture(`\r\n`)
  );
  return +ensureValue(result, 0, /:([0-9]+)/);
}
