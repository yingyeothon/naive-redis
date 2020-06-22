import TextMatch from "@yingyeothon/naive-socket/lib/match";
import { IRedisConnection } from "./connection";
export interface ISend<T> {
    connection: IRedisConnection;
    commands: string[];
    match: (m: TextMatch) => TextMatch;
    transform: (result: string[]) => T;
    urgent?: boolean;
}
export default function send<T>({ connection, commands, match, transform, urgent, }: ISend<T>): Promise<T>;
