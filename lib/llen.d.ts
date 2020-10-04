import { RedisConnection } from "./connection";
export default function redisLlen(connection: RedisConnection, key: string): Promise<number>;
