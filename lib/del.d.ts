import { RedisConnection } from "./connection";
export default function redisDel(connection: RedisConnection, ...keys: string[]): Promise<number>;
