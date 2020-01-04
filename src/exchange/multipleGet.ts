import { IRedisConnection } from "../connection";
import send from "../send";
import ensureValue from "./ensureValue";

export default function multipleGet(
  connection: IRedisConnection,
  commands: string[]
) {
  return send({
    connection,
    commands,
    match: m => {
      m.capture(`\r\n`);
      const first = m.values()[0];
      if (!first || first === "*0" || first.startsWith("-")) {
        return m;
      }
      const count = +first.slice(1);
      for (let index = 0; index < count; ++index) {
        m.capture(`\r\n`).capture(`\r\n`);
      }
      return m;
    },
    transform: result => {
      const length = +ensureValue(result, 0, /\*([0-9]+)/);
      const values = result.filter((_, i) => i !== 0 && i % 2 === 0);
      if (length !== values.length) {
        throw new Error(`Error: mismatch length`);
      }
      return values;
    }
  });
}
