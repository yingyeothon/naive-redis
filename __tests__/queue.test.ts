import lindex from "../src/lindex";
import llen from "../src/llen";
import lpop from "../src/lpop";
import lrange from "../src/lrange";
import ltrim from "../src/ltrim";
import rpush from "../src/rpush";
import fixture from "./fixture";

fixture(`simple-push-pop`, async connection => {
  const testKey = `naive-redis-queue`;
  const testValue = (index: number) =>
    JSON.stringify(JSON.stringify({ hello: `world`, index }));
  const expectedTestValue = (index: number) =>
    JSON.stringify({ hello: `world`, index });

  expect(await llen(connection, testKey)).toBe(0);
  expect(await lpop(connection, testKey)).toBeNull();
  expect(await lindex(connection, testKey, 0)).toBeNull();

  expect(await rpush(connection, testKey, testValue(0))).toBe(1);
  expect(await llen(connection, testKey)).toBe(1);

  expect(await rpush(connection, testKey, testValue(1))).toBe(2);
  expect(await llen(connection, testKey)).toBe(2);

  expect(await lindex(connection, testKey, 0)).toEqual(expectedTestValue(0));
  expect(await lindex(connection, testKey, 1)).toEqual(expectedTestValue(1));

  expect(await lpop(connection, testKey)).toEqual(expectedTestValue(0));
  expect(await llen(connection, testKey)).toBe(1);
  expect(await lindex(connection, testKey, 0)).toEqual(expectedTestValue(1));

  expect(await lpop(connection, testKey)).toEqual(expectedTestValue(1));
  expect(await llen(connection, testKey)).toBe(0);
  expect(await lindex(connection, testKey, 0)).toBeNull();
  expect(await lpop(connection, testKey)).toBeNull();
});

fixture(`flush-queue`, async connection => {
  const testKey = `naive-redis-queue-flush`;
  const testValue = [`a`, `b`, `c`, `d`, `e`];
  expect(await rpush(connection, testKey, ...testValue)).toBe(5);
  expect(await llen(connection, testKey)).toBe(5);
  expect(await lrange(connection, testKey, 0, -1)).toEqual(testValue);
  expect(await ltrim(connection, testKey, testValue.length)).toBeTruthy();
});
