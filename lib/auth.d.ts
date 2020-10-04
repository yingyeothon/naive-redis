import { RedisConnection } from "./connection";
export default function redisAuth(connection: RedisConnection, password: string): Promise<boolean>;
