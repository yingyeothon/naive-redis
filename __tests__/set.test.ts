import sadd from "../src/sadd";
import smembers from "../src/smembers";
import srem from "../src/srem";
import fixture from "./fixture";

fixture(`set-simple`, async connection => {
  const testKey = `naive-redis-set`;
  const testValue = [`a`, `b`, `c`, `d`, `e`];
  expect(await sadd(connection, testKey, ...testValue)).toBe(5);
  expect(await sadd(connection, testKey, ...testValue)).toBe(0);
  expect(await srem(connection, testKey, ...testValue)).toBe(5);
  expect(await srem(connection, testKey, ...testValue)).toBe(0);

  expect(await sadd(connection, testKey, ...testValue)).toBe(5);
  expect((await smembers(connection, testKey)).sort()).toEqual(
    testValue.sort()
  );
  expect(await srem(connection, testKey, ...testValue)).toBe(5);
  expect(await smembers(connection, testKey)).toEqual([]);
});
