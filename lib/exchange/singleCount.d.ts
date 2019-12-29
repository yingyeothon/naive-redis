import { IRedisConnection } from "../connection";
export default function singleCount(connection: IRedisConnection, commands: string[]): Promise<number>;
