import Matcher from "@yingyeothon/naive-socket/lib/match";
import ensureValue from "./ensureValue";

export const match = (m: Matcher) => m.capture(`\r\n`);

export default function singleCount(result: string[]) {
  const count = ensureValue(result, 0, /:([0-9]+)/);
  return +count;
}
