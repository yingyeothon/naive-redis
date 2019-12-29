import del from "../src/del";
import get from "../src/get";
import set from "../src/set";
import fixture from "./fixture";

fixture("simple-get-set-del", async connection => {
  const testKey = `naive-redis-get-set-del-test`;
  const testValue = JSON.stringify({ this: `is`, something: 19391 });
  expect(await del(connection, testKey)).toBe(0);
  expect(await get(connection, testKey)).toBeNull();

  await set(connection, testKey, testValue);
  expect(await get(connection, testKey)).toEqual(testValue);
  expect(await del(connection, testKey)).toBe(1);
  expect(await get(connection, testKey)).toBeNull();
});

fixture("simple-get-set-del-many", async connectino => {
  for (let index = 0; index < 100; ++index) {
    const testKey = `naive-redis-get-set-del-test-${index}`;
    const testValue = JSON.stringify({ this: `is`, something: 19391, index });
    expect(await del(connectino, testKey)).toBe(0);
    expect(await get(connectino, testKey)).toBeNull();

    await set(connectino, testKey, testValue);
    expect(await get(connectino, testKey)).toEqual(testValue);
    expect(await del(connectino, testKey)).toBe(1);
    expect(await get(connectino, testKey)).toBeNull();
  }
});

fixture("del-many", async connection => {
  const count = 100;
  const keys: string[] = [];
  for (let index = 0; index < count; ++index) {
    const testKey = `naive-redis-get-set-del-test-${index}`;
    await set(
      connection,
      testKey,
      JSON.stringify({ this: `is`, something: 19391, index })
    );
    keys.push(testKey);
  }
  expect(await del(connection, ...keys)).toBe(count);
});
