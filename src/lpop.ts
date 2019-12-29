import { IRedisConnection } from "./connection";
import singleGet from "./exchange/singleGet";

export default function lpop(connection: IRedisConnection, key: string) {
  return singleGet(connection, [`LPOP "${key}"`]);
}
