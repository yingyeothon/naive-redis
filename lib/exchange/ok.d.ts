import { IRedisConnection } from "../connection";
export default function ok(connection: IRedisConnection, commands: string[], { urgent }?: {
    urgent?: boolean;
}): Promise<boolean>;
