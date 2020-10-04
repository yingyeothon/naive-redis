import TextMatch from "@yingyeothon/naive-socket/lib/match";
import { RedisConnection } from "./connection";
export interface Send<T> {
    connection: RedisConnection;
    commands: string[];
    match: (m: TextMatch) => TextMatch;
    transform: (result: string[]) => T;
    urgent?: boolean;
}
export default function redisSend<T>({ connection, commands, match, transform, urgent, }: Send<T>): Promise<T>;
