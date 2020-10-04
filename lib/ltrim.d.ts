import { RedisConnection } from "./connection";
export default function redisLtrim(connection: RedisConnection, key: string, start: number, end?: number): Promise<boolean>;
