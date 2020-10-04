import { RedisConnection } from "./connection";
export default function redisSmembers(connection: RedisConnection, key: string): Promise<string[]>;
