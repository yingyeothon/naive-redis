import Matcher from "@yingyeothon/naive-socket/lib/match";
import ensureValue from "./ensureValue";

export const match = (m: Matcher) => {
  m.capture(`\r\n`);
  return m.value(0) === "$-1" || m.value(0).startsWith("-")
    ? m
    : m.capture(`\r\n`);
};

export default function singleGet(result: string[]) {
  const length = ensureValue(result, 0, /\$(-?[0-9]+)/);
  return length === "-1" ? null : result[1];
}
