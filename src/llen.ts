import { IRedisConnection } from "./connection";
import singleCount from "./exchange/singleCount";

export default function llen(connection: IRedisConnection, key: string) {
  return singleCount(connection, [`llen "${key}"`]);
}
