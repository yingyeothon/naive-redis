import { IRedisConnection } from "../connection";
import ensureValue from "./ensureValue";
import send from "./send";

export default function multipleGet(
  connection: IRedisConnection,
  commands: string[]
) {
  return send({
    connection,
    commands,
    match: m => {
      m.capture(`\r\n`);
      const count = m.value(0);
      if (!count || count === "$-1" || count.startsWith("-")) {
        return m;
      }
      return m.loop(0, () => m.capture(`\r\n`).capture(`\r\n`));
    },
    transform: result => {
      const length = +ensureValue(result, 0, /\$(-?[0-9]+)/);
      const values = result.filter((_, i) => i !== 0 && i % 2 === 0);
      if (length !== values.length) {
        throw new Error(`Error: mismatch length`);
      }
      return values;
    }
  });
}
