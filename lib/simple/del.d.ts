import { RedisConfig } from "../connection";
export default function redisSimpleDel({ config, key, }: {
    config: RedisConfig;
    key: string;
}): Promise<number>;
