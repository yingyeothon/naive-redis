import { IRedisConnection } from "./connection";
export default function ltrim(connection: IRedisConnection, key: string, start: number, end?: number): Promise<boolean>;
