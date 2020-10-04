import { RedisConnection } from "../connection";
export default function ok(connection: RedisConnection, commands: string[], { urgent }?: {
    urgent?: boolean;
}): Promise<boolean>;
