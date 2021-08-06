import { RedisConnection } from "./connection";
export default function redisExists(connection: RedisConnection, ...keys: string[]): Promise<number>;
