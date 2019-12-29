import { IRedisConnection } from "./connection";
import singleGet from "./exchange/singleGet";

export default function get(connection: IRedisConnection, key: string) {
  return singleGet(connection, [`GET "${key}"`]);
}
