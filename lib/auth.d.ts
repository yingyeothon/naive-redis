import { IRedisConnection } from "./connection";
export default function auth(connection: IRedisConnection, password: string): Promise<boolean>;
