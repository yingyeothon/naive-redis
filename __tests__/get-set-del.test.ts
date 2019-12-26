import connect from "../src/connection";
import del from "../src/del";
import get from "../src/get";
import set from "../src/set";

test("simple-get-set-del", async () => {
  const conn = await connect({
    host: "localhost"
  });
  const testKey = `naive-redis-get-set-del-test`;
  const testValue = JSON.stringify({ this: `is`, something: 19391 });
  expect(await del(conn, testKey)).toBe(0);
  expect(await get(conn, testKey)).toBeNull();

  await set(conn, testKey, testValue);
  expect(await get(conn, testKey)).toEqual(testValue);
  expect(await del(conn, testKey)).toBe(1);
  expect(await get(conn, testKey)).toBeNull();

  conn.disconnect();
});

test("simple-get-set-del-many", async () => {
  const conn = await connect({
    host: "localhost"
  });
  for (let index = 0; index < 100; ++index) {
    const testKey = `naive-redis-get-set-del-test-${index}`;
    const testValue = JSON.stringify({ this: `is`, something: 19391, index });
    expect(await del(conn, testKey)).toBe(0);
    expect(await get(conn, testKey)).toBeNull();

    await set(conn, testKey, testValue);
    expect(await get(conn, testKey)).toEqual(testValue);
    expect(await del(conn, testKey)).toBe(1);
    expect(await get(conn, testKey)).toBeNull();
  }
  conn.disconnect();
});

test("del-many", async () => {
  const conn = await connect({
    host: "localhost"
  });
  const count = 100;
  const keys: string[] = [];
  for (let index = 0; index < count; ++index) {
    const testKey = `naive-redis-get-set-del-test-${index}`;
    await set(
      conn,
      testKey,
      JSON.stringify({ this: `is`, something: 19391, index })
    );
    keys.push(testKey);
  }
  expect(await del(conn, ...keys)).toBe(count);
  conn.disconnect();
});
