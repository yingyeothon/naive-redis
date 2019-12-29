import { IRedisConnection } from "./connection";
export default function lrange(connection: IRedisConnection, key: string, start: number, end?: number): Promise<string[]>;
