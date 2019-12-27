import { RedisConnection } from "./connection";
import singleCount, { match } from "./response/singleCount";

export default async function del(conn: RedisConnection, ...keys: string[]) {
  const result = await conn.send(
    [`DEL ${keys.map(e => `"${e}"`).join(" ")}`],
    match
  );
  return singleCount(result);
}
