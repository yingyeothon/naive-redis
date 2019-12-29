import { IRedisConnection } from "./connection";
import singleCount from "./exchange/singleCount";

export default function sadd(
  connection: IRedisConnection,
  key: string,
  ...values: string[]
) {
  return singleCount(connection, [`SADD "${key}" ${values.join(" ")}`]);
}
