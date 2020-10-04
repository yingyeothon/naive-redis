import { RedisConnection } from "./connection";
export default function redisSrem(connection: RedisConnection, key: string, ...values: string[]): Promise<number>;
