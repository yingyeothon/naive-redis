import { IRedisConnection } from "./connection";
export default function sadd(connection: IRedisConnection, key: string, ...values: string[]): Promise<number>;
