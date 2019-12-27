import Matcher from "@yingyeothon/naive-socket/lib/match";
import ensureValue from "./ensureValue";

export const match = (m: Matcher) => {
  m.capture(`\r\n`);
  const count = m.value(0);
  if (!count || count === "$-1" || count.startsWith("-")) {
    return m;
  }
  return m.loop(0, () => m.capture(`\r\n`).capture(`\r\n`));
};

export default function singleGet(result: string[]) {
  const length = +ensureValue(result, 0, /\$(-?[0-9]+)/);
  const values = result.filter((_, i) => i !== 0 && i % 2 === 0);
  if (length !== values.length) {
    throw new Error(`Error: mismatch length`);
  }
  return values;
}
