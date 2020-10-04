import { RedisConnection } from "./connection";
export default function redisRpush(connection: RedisConnection, key: string, ...values: string[]): Promise<number>;
