import { IRedisConnection } from "./connection";
interface ISetOptions {
    expirationMillis?: number;
    onlySet?: "nx" | "xx";
    stringify?: boolean;
}
export default function set(connection: IRedisConnection, key: string, value: string, { expirationMillis, onlySet, stringify }?: ISetOptions): Promise<boolean>;
export {};
