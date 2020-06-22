import { IRedisConnection } from "./connection";
import ok from "./exchange/ok";

export default function auth(connection: IRedisConnection, password: string) {
  return ok(connection, [`AUTH ${password}`], { urgent: true });
}
