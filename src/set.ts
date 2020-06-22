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
  const command: string[] = [`SET`, key, value];
  if (expirationMillis !== undefined) {
    command.push(`PX`);
    command.push(expirationMillis.toString());
  }
  if (onlySet !== undefined) {
    command.push(onlySet.toUpperCase());
  }
  return send({
    connection,
    commands: [serializeCommand(command)],
    match: (m) => m.capture(`\r\n`),
    transform: (result) => ensureValue(result, 0, /(\+OK|\$-1)/) === "+OK",
  });
}

function serializeCommand(command: string[]): string {
  const totalLength = command
    .map((part) => part.length)
    .reduce((a, b) => a + b, 0);
  const maxInlineRequestLength = 1 << 16;
  if (
    totalLength <= maxInlineRequestLength &&
    command.every((part) => !part.includes(`"`))
  ) {
    return command.join(` `);
  }

  const lines: string[] = [];
  lines.push(`*${command.length}`);
  for (const part of command) {
    let partLength = part.length;
    lines.push(`$${partLength}`);
    lines.push(part);
  }
  return lines.join(`\r\n`) + `\r\n`;
}
