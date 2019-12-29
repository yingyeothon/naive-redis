import { IRedisConnection } from "./connection";
export default function lpop(connection: IRedisConnection, key: string): Promise<string | null>;
