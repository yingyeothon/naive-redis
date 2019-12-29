import NaiveSocket from "@yingyeothon/naive-socket";
interface IConnectionInfo {
    host: string;
    port?: number;
    password?: string;
    timeoutMillis?: number;
}
export interface IRedisConnection {
    socket: NaiveSocket;
    timeoutMillis: number;
}
export default function connect({ host, port, password, timeoutMillis }: IConnectionInfo): Promise<IRedisConnection>;
export {};
