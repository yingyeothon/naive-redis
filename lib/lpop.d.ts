import { RedisConnection } from "./connection";
export default function redisLpop(connection: RedisConnection, key: string): Promise<string | null>;
