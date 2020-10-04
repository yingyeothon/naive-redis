import { RedisConnection } from "./connection";
export default function redisSadd(connection: RedisConnection, key: string, ...values: string[]): Promise<number>;
