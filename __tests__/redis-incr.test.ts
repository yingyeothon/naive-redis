import del from "../src/del";
import fixture from "./fixture";
import get from "../src/get";
import incr from "../src/incr";
import set from "../src/set";

fixture("simple-incr", async (connection) => {
  const testKey = `naive-redis-incr`;
  expect(await del(connection, testKey)).toBe(0);
  expect(await get(connection, testKey)).toBeNull();

  await set(connection, testKey, "10");
  expect(await get(connection, testKey)).toEqual("10");
  expect(await incr(connection, testKey)).toBe(11);
  expect(await get(connection, testKey)).toEqual("11");
  expect(await del(connection, testKey)).toBe(1);
  expect(await get(connection, testKey)).toBeNull();
  expect(await incr(connection, testKey)).toBe(1);
  expect(await get(connection, testKey)).toEqual("1");
  expect(await del(connection, testKey)).toBe(1);
  expect(await get(connection, testKey)).toBeNull();
});
