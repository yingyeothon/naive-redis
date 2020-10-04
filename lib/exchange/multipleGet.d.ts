import { RedisConnection } from "../connection";
export default function multipleGet(connection: RedisConnection, commands: string[]): Promise<string[]>;
