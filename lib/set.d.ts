import { IRedisConnection } from "./connection";
interface ISetOptions {
    expirationMillis?: number;
    onlySet?: "nx" | "xx";
}
export default function set(connection: IRedisConnection, key: string, value: string, { expirationMillis, onlySet }?: ISetOptions): Promise<boolean>;
export {};
