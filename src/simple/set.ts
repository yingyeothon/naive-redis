import { RedisConfig } from "../connection";
import redisSet from "../set";
import redisSimpleWork from "./work";

export default async function redisSimpleSet<T>({
  config,
  key,
  value,
  expirationMillis,
  encode = JSON.stringify,
}: {
  config: RedisConfig;
  key: string;
  value: T;
  expirationMillis?: number;
  encode?: (maybe: T) => string;
}): Promise<boolean> {
  return await redisSimpleWork(config, async (connection) => {
    return await redisSet(connection, key, encode(value), {
      expirationMillis,
    });
  });
}
