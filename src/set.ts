import { IRedisConnection } from "./connection";
import ensureValue from "./exchange/ensureValue";
import send from "./send";

interface ISetOptions {
  expirationMillis?: number;
  onlySet?: "nx" | "xx";
}

export default function set(
  connection: IRedisConnection,
  key: string,
  value: string,
  { expirationMillis, onlySet }: ISetOptions = {}
) {
  const command: string[] = [`SET`, `"${key}"`, JSON.stringify(value)];
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
    transform: result => ensureValue(result, 0, /(\+OK|\$-1)/) === "+OK"
  });
}
