import { IRedisConnection } from "./connection";
export default function get(connection: IRedisConnection, key: string): Promise<string | null>;
