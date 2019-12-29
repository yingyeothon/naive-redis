import { IRedisConnection } from "../connection";
export default function ok(connection: IRedisConnection, commands: string[]): Promise<boolean>;
