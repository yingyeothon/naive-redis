import { IRedisConnection } from "./connection";
export default function srem(connection: IRedisConnection, key: string, ...values: string[]): Promise<number>;
