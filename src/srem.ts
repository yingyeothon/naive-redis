import { IRedisConnection } from "./connection";
import singleCount from "./exchange/singleCount";

export default function srem(
  connection: IRedisConnection,
  key: string,
  ...values: string[]
) {
  return singleCount(connection, [`SREM "${key}" ${values.join(" ")}`]);
}
