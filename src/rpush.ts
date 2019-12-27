import { RedisConnection } from "./connection";
import singleCount, { match } from "./response/singleCount";

export default async function rpush(
  conn: RedisConnection,
  key: string,
  ...values: string[]
) {
  const result = await conn.send([`RPUSH "${key}" ${values.join(" ")}`], match);
  return singleCount(result);
}
