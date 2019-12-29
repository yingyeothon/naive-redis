# Naive Socket

This is a very lightweight Redis client. It can be helpful in the system that needs small codebase such as AWS Lambda runtime.

## Installation

```bash
yarn add @yingyeothon/naive-redis
```

## Example

```typescript
import connect from "@yingyeothon/naive-redis/lib/connect";
import get from "@yingyeothon/naive-redis/lib/get";
import set from "@yingyeothon/naive-redis/lib/set";

const connection = connect({
  host: `my.redis.domain`,
  port: 6379,
  password: `very-secret-password`,
  timeoutMillis: 1000
});

// Get a value from Redis
const myValue = await get(connection, `my-redis-key`);

// Set a new value into Redis with expiration and overwritten options.
await set(
  connection,
  `my-redis-key`,
  JSON.stringify({
    something: `very-complex`
  }),
  {
    expirationMillis: 5000,
    onlySet: `xx`,

    // This means this library would use `JSON.stringify` to wrap your value with `"` character with escaping.
    // If a value has a pretty good quotations it would not be needed.
    stringify: true
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

## License

MIT