import { RedisConnection } from "./connection";
import { ensureValue } from "./utils";

interface ISetOptions {
  expirationMillis?: number;
  onlySet?: "nx" | "xx";
  stringify?: boolean;
}

export default async function set(
  conn: RedisConnection,
  key: string,
  value: string,
  { expirationMillis, onlySet, stringify = true }: ISetOptions = {}
) {
  const command: string[] = [
    `SET`,
    `"${key}"`,
    stringify ? JSON.stringify(value) : `"${value}"`
  ];
  if (expirationMillis !== undefined) {
    command.push(`PX`);
    command.push(expirationMillis.toString());
  }
  if (onlySet !== undefined) {
    command.push(onlySet.toUpperCase());
  }
  const result = await conn.send([command.join(` `)], m => m.capture(`\r\n`));
  return onlySet === undefined
    ? ensureValue(result, 0, /\+(OK)/) === "OK"
    : ensureValue(result, 0, /:([0|1])/) === "1";
}
