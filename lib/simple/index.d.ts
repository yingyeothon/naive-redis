import { Fn, RedisSimpleCacheFriends, RedisSimpleCacheOptions } from "./cache";
import { RedisConfig } from "../connection";
export default class RedisSimple {
    private readonly config;
    private readonly encode;
    private readonly decode;
    private readonly keyPrefix;
    constructor({ config, encode, decode, keyPrefix, }: {
        config: RedisConfig;
        encode?: (input: unknown) => string;
        decode?: <T>(input: string) => T;
        keyPrefix?: string;
    });
    cache: <A extends unknown[], R>(fn: Fn<A, R>, { cacheKey, expirationMillis, }: Pick<RedisSimpleCacheOptions<A, R>, "expirationMillis" | "cacheKey">) => RedisSimpleCacheFriends<A, R>;
    get: <T>(key: string) => Promise<T | null>;
    set: (key: string, value: unknown, expirationMillis?: number) => Promise<boolean>;
    del: (key: string) => Promise<number>;
}
