import { RedisConnection } from "../connection";
export default function singleGet(connection: RedisConnection, commands: string[]): Promise<string | null>;
