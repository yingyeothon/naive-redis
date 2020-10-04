import { RedisConnection } from "./connection";
interface SetOptions {
    expirationMillis?: number;
    onlySet?: "nx" | "xx";
}
export default function redisSet(connection: RedisConnection, key: string, value: string, { expirationMillis, onlySet }?: SetOptions): Promise<boolean>;
export {};
