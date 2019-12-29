import { IRedisConnection } from "./connection";
import ensureValue from "./exchange/ensureValue";
import send from "./send";

interface ISetOptions {
  expirationMillis?: number;
  onlySet?: "nx" | "xx";
  stringify?: boolean;
}

export default function set(
  connection: IRedisConnection,
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
  return send({
    connection,
    commands: [command.join(` `)],
    match: m => m.capture(`\r\n`),
    transform: result =>
      onlySet === undefined
        ? ensureValue(result, 0, /\+(OK)/) === "OK"
        : ensureValue(result, 0, /:([0|1])/) === "1"
  });
}
