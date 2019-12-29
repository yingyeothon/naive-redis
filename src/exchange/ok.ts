import { IRedisConnection } from "../connection";
import ensureValue from "./ensureValue";
import send from "./send";

export default function ok(connection: IRedisConnection, commands: string[]) {
  return send({
    connection,
    commands,
    match: m => m.capture(`\r\n`),
    transform: result => ensureValue(result, 0, /\+(OK)/) === "OK"
  });
}
