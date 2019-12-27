import Matcher from "@yingyeothon/naive-socket/lib/match";
import ensureValue from "./ensureValue";

export const match = (m: Matcher) => m.capture(`\r\n`);

export default function ok(result: string[]) {
  return ensureValue(result, 0, /\+(OK)/) === "OK";
}
