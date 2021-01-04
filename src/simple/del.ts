import { RedisConfig } from "../connection";
import redisDel from "../del";
import redisSimpleWork from "./work";

export default async function redisSimpleDel({
  config,
  key,
}: {
  config: RedisConfig;
  key: string;
}): Promise<number> {
  return await redisSimpleWork(config, async (connection) => {
    return await redisDel(connection, key);
  });
}
