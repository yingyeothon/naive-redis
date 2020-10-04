import { RedisConnection } from "./connection";
import ok from "./exchange/ok";

export default function redisAuth(
  connection: RedisConnection,
  password: string
): Promise<boolean> {
  return ok(connection, [`AUTH ${password}`], { urgent: true });
}
