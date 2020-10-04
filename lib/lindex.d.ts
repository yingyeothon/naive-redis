import { RedisConnection } from "./connection";
export default function redisLindex(connection: RedisConnection, key: string, pos: number): Promise<string | null>;
