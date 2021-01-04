import { RedisConfig } from "../connection";
import redisGet from "../get";
import redisSimpleWork from "./work";

export default async function redisSimpleGet<T>({
  config,
  key,
  decode = JSON.parse,
}: {
  config: RedisConfig;
  key: string;
  decode?: (maybe: string) => T;
}): Promise<T | null> {
  return await redisSimpleWork(config, async (connection) => {
    const maybe = await redisGet(connection, key);
    return maybe ? decode(maybe) : null;
  });
}
