import { IRedisConnection } from "./connection";
import multipleGet from "./exchange/multipleGet";

export default function lrange(
  connection: IRedisConnection,
  key: string,
  start: number,
  end: number
) {
  return multipleGet(connection, [`LRANGE "${key}" ${start} ${end}`]);
}
