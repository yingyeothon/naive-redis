import { IRedisConnection } from "../connection";
import ensureValue from "./ensureValue";
import send from "./send";

export default function singleCount(
  connection: IRedisConnection,
  commands: string[]
) {
  return send({
    connection,
    commands,
    match: m => m.capture(`\r\n`),
    transform: result => +ensureValue(result, 0, /:([0-9]+)/)
  });
}
