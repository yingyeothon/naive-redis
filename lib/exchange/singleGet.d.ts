import { IRedisConnection } from "../connection";
export default function singleGet(connection: IRedisConnection, commands: string[]): Promise<string | null>;
