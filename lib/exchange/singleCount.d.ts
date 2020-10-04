import { RedisConnection } from "../connection";
export default function singleCount(connection: RedisConnection, commands: string[]): Promise<number>;
