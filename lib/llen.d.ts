import { IRedisConnection } from "./connection";
export default function llen(connection: IRedisConnection, key: string): Promise<number>;
