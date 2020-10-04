import NaiveSocket from "@yingyeothon/naive-socket";
interface ConnectionInfo {
    host: string;
    port?: number;
    password?: string;
    timeoutMillis?: number;
}
export interface RedisConnection {
    socket: NaiveSocket;
    timeoutMillis: number;
    authenticated?: Promise<boolean>;
}
export default function redisConnect({ host, port, password, timeoutMillis, }: ConnectionInfo): RedisConnection;
export {};
