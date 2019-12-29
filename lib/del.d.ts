import { IRedisConnection } from "./connection";
export default function del(connection: IRedisConnection, ...keys: string[]): Promise<number>;
