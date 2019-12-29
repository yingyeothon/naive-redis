import { IRedisConnection } from "./connection";
import singleGet from "./exchange/singleGet";

export default function lindex(
  connection: IRedisConnection,
  key: string,
  pos: number
) {
  return singleGet(connection, [`LINDEX "${key}" ${pos}`]);
}
