import { IRedisConnection } from "./connection";
export default function rpush(connection: IRedisConnection, key: string, ...values: string[]): Promise<number>;
