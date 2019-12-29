import Matcher from "@yingyeothon/naive-socket/lib/match";
import { IRedisConnection } from "./connection";
export interface ISend<T> {
    connection: IRedisConnection;
    commands: string[];
    match: (m: Matcher) => Matcher;
    transform: (result: string[]) => T;
}
export default function send<T>({ connection, commands, match, transform }: ISend<T>): Promise<T>;
