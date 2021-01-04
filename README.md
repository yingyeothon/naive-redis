# Naive Socket

This is a very lightweight Redis client. It can be helpful in the system that needs small codebase such as AWS Lambda runtime.

## Installation

```bash
yarn add @yingyeothon/naive-redis
```

## Example

```typescript
import redisConnect from "@yingyeothon/naive-redis/lib/connect";
import redisGet from "@yingyeothon/naive-redis/lib/get";
import redisSet from "@yingyeothon/naive-redis/lib/set";

const connection = redisConnect({
  host: `my.redis.domain`,
  port: 6379,
  password: `very-secret-password`,
  timeoutMillis: 1000,
});

// Get a value from Redis
const myValue = await redisGet(connection, `my-redis-key`);

// Set a new value into Redis with expiration and overwritten options.
await redisSet(
  connection,
  `my-redis-key`,
  JSON.stringify({
    something: `very-complex`,
  }),
  {
    expirationMillis: 5000,
    // "nx" means set only if absent.
    // "xx" means set only if present.
    onlySet: `xx`,
  }
);
```

## Supported commands

- auth
- del
- get
- set
- lindex
- llen
- lpop
- lrange
- ltrim
- rpush
- sadd
- smembers
- srem

## Simple supports

It supports some simple patterns easy to use.

```typescript
import RedisSimple from "@yingyeothon/naive-redis/lib/simple";
import lzutf8 from "lzutf8";

function compressionDecode<T>(maybe: string): T {
  return JSON.parse(
    lzutf8.decompress(maybe, {
      inputEncoding: "Base64",
      outputEncoding: "String",
    })
  );
}

function compressionEncode<T>(input: T | null): string {
  return lzutf8.compress(JSON.stringify(input), {
    inputEncoding: "String",
    outputEncoding: "Base64",
  });
}

export const { cache, get, set, del } = new RedisSimple({
  config: { host, password, timeoutMillis },
  decode: compressionDecode,
  encode: compressionEncode,
  keyPrefix: redisKeyPrefix,
});
```

## License

MIT
