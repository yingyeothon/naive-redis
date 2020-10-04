import { RedisConnection } from "./connection";
export default function redisGet(connection: RedisConnection, key: string): Promise<string | null>;
