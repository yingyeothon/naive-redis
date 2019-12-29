import { IRedisConnection } from "./connection";
export default function lindex(connection: IRedisConnection, key: string, pos: number): Promise<string | null>;
