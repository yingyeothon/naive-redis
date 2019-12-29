import { IRedisConnection } from "./connection";
export default function smembers(connection: IRedisConnection, key: string): Promise<string[]>;
