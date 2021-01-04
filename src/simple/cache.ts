import { RedisConfig } from "../connection";
import redisGet from "../get";
import redisSet from "../set";
import redisSimpleDel from "./del";
import redisSimpleGet from "./get";
import redisSimpleSet from "./set";
import redisSimpleWork from "./work";

export type Fn<Args extends unknown[], ReturnType> = (
  ...args: Args
) => Promise<ReturnType>;

export type RedisSimpleCacheFriends<Args extends unknown[], ReturnType> = Fn<
  Args,
  ReturnType
> & {
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

export default function redisSimpleCache<A extends unknown[], R>(
  fn: Fn<A, R>,
  {
    config,
    cacheKey,
    expirationMillis,
    decode = JSON.parse,
    encode = JSON.stringify,
  }: RedisSimpleCacheOptions<A, R>
): RedisSimpleCacheFriends<A, R> {
  async function computeIfAbsent(...args: A): Promise<R> {
    const key = cacheKey(...args);
    return await redisSimpleWork(config, async (connection) => {
      const maybe = await redisGet(connection, key);
      if (maybe !== null) {
        return decode(maybe);
      }
      const result = await fn(...args);
      await redisSet(connection, key, encode(result), { expirationMillis });
      return result;
    });
  }

  async function refresh(...args: A): Promise<void> {
    await redisSimpleSet({
      config,
      key: cacheKey(...args),
      value: await fn(...args),
      expirationMillis,
      encode,
    });
  }

  async function clear(...args: A): Promise<void> {
    await redisSimpleDel({ config, key: cacheKey(...args) });
  }

  async function peek(...args: A): Promise<R | null> {
    return await redisSimpleGet({
      config,
      key: cacheKey(...args),
      decode,
    });
  }

  computeIfAbsent.refresh = refresh;
  computeIfAbsent.clear = clear;
  computeIfAbsent.peek = peek;
  computeIfAbsent.fn = fn;
  return computeIfAbsent;
}
