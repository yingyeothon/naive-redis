import { RedisConnection } from "./connection";
export default function redisLrange(connection: RedisConnection, key: string, start: number, end?: number): Promise<string[]>;
