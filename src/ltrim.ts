import { IRedisConnection } from "./connection";
import ok from "./exchange/ok";

export default function ltrim(
  connection: IRedisConnection,
  key: string,
  start: number,
  end: number = -1
) {
  return ok(connection, [`LTRIM "${key}" ${start} ${end}`]);
}
