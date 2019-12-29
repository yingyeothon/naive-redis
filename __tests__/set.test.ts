import connect from "../src/connection";
import sadd from "../src/sadd";
import smembers from "../src/smembers";
import srem from "../src/srem";

test(`set-simple`, async () => {
  const conn = await connect({
    host: "localhost"
  });

  const testKey = `naive-redis-set`;
  const testValue = [`a`, `b`, `c`, `d`, `e`];
  expect(await sadd(conn, testKey, ...testValue)).toBe(5);
  expect(await sadd(conn, testKey, ...testValue)).toBe(0);
  expect(await srem(conn, testKey, ...testValue)).toBe(5);
  expect(await srem(conn, testKey, ...testValue)).toBe(0);

  expect(await sadd(conn, testKey, ...testValue)).toBe(5);
  expect((await smembers(conn, testKey)).sort()).toEqual(testValue.sort());
  expect(await srem(conn, testKey, ...testValue)).toBe(5);
  expect(await smembers(conn, testKey)).toEqual([]);

  conn.socket.disconnect();
});
