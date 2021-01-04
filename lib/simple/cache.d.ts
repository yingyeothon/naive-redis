import { RedisConfig } from "../connection";
export declare type Fn<Args extends unknown[], ReturnType> = (...args: Args) => Promise<ReturnType>;
export declare type RedisSimpleCacheFriends<Args extends unknown[], ReturnType> = Fn<Args, ReturnType> & {
    refresh: Fn<Args, void>;
    clear: Fn<Args, void>;
    peek: Fn<Args, ReturnType | null>;
    fn: Fn<Args, ReturnType>;
};
export interface RedisSimpleCacheOptions<A extends unknown[], R> {
    config: RedisConfig;
    cacheKey: (...args: A) => string;
    expirationMillis?: number;
    decode?: (input: string) => R;
    encode?: (input: R) => string;
}
export default function redisSimpleCache<A extends unknown[], R>(fn: Fn<A, R>, { config, cacheKey, expirationMillis, decode, encode, }: RedisSimpleCacheOptions<A, R>): RedisSimpleCacheFriends<A, R>;
