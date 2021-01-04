import redisSimpleCache, {
  Fn,
  RedisSimpleCacheFriends,
  RedisSimpleCacheOptions,
} from "./cache";

import { RedisConfig } from "../connection";
import redisSimpleDel from "./del";
import redisSimpleGet from "./get";
import redisSimpleSet from "./set";

export default class RedisSimple {
  private readonly config: RedisConfig;
  private readonly encode: (input: unknown) => string;
  private readonly decode: <T>(input: string) => T;
  private readonly keyPrefix: string;

  constructor({
    config,
    encode = JSON.stringify,
    decode = JSON.parse,
    keyPrefix = "",
  }: {
    config: RedisConfig;
    encode?: (input: unknown) => string;
    decode?: <T>(input: string) => T;
    keyPrefix?: string;
  }) {
    this.config = config;
    this.encode = encode;
    this.decode = decode;
    this.keyPrefix = keyPrefix;
  }

  public cache = <A extends unknown[], R>(
    fn: Fn<A, R>,
    {
      cacheKey,
      expirationMillis,
    }: Pick<RedisSimpleCacheOptions<A, R>, "cacheKey" | "expirationMillis">
  ): RedisSimpleCacheFriends<A, R> => {
    return redisSimpleCache<A, R>(fn, {
      config: this.config,
      cacheKey: (...args: A) => this.keyPrefix + cacheKey(...args),
      encode: this.encode,
      decode: this.decode,
      expirationMillis: expirationMillis,
    });
  };

  public get = async <T>(key: string): Promise<T | null> => {
    return await redisSimpleGet<T>({
      config: this.config,
      key,
      decode: this.decode,
    });
  };

  public set = async (
    key: string,
    value: unknown,
    expirationMillis?: number
  ): Promise<boolean> => {
    return await redisSimpleSet({
      config: this.config,
      key,
      value,
      expirationMillis,
      encode: this.encode,
    });
  };

  public del = async (key: string): Promise<number> => {
    return await redisSimpleDel({ config: this.config, key });
  };
}
