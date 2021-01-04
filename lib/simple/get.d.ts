import { RedisConfig } from "../connection";
export default function redisSimpleGet<T>({ config, key, decode, }: {
    config: RedisConfig;
    key: string;
    decode?: (maybe: string) => T;
}): Promise<T | null>;
