import { IRedisConnection } from "../connection";
import send from "../send";
import ensureValue from "./ensureValue";

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
