import { RedisConfig } from "../connection";
export default function redisSimpleSet<T>({ config, key, value, expirationMillis, encode, }: {
    config: RedisConfig;
    key: string;
    value: T;
    expirationMillis?: number;
    encode?: (maybe: T) => string;
}): Promise<boolean>;
