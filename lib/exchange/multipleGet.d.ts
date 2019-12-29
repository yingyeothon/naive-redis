import { IRedisConnection } from "../connection";
export default function multipleGet(connection: IRedisConnection, commands: string[]): Promise<string[]>;
