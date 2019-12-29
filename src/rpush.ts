import { IRedisConnection } from "./connection";
import singleCount from "./exchange/singleCount";

export default function rpush(
  connection: IRedisConnection,
  key: string,
  ...values: string[]
) {
  return singleCount(connection, [`RPUSH "${key}" ${values.join(" ")}`]);
}
