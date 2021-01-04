import { RedisConfig, RedisConnection } from "../connection";
export default function redisSimpleWork<R>(config: RedisConfig, work: (connection: RedisConnection) => Promise<R>): Promise<R>;
