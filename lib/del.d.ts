import { RedisConnection } from "./connection";
export default function del(connection: RedisConnection, ...keys: string[]): Promise<number>;
