import NaiveSocket from "@yingyeothon/naive-socket";
export interface RedisConfig {
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
export default function redisConnect({ host, port, password, timeoutMillis, }: RedisConfig): RedisConnection;
