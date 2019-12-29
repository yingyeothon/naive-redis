import { IRedisConnection } from "./connection";
import multipleGet from "./exchange/multipleGet";

export default function smembers(connection: IRedisConnection, key: string) {
  return multipleGet(connection, [`SMEMBERS "${key}"`]);
}
