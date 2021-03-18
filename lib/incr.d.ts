import { RedisConnection } from "./connection";
export default function redisIncr(connection: RedisConnection, key: string): Promise<number>;
