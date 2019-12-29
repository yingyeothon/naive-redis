import connect from "../src/connection";
import lindex from "../src/lindex";
import llen from "../src/llen";
import lpop from "../src/lpop";
import lrange from "../src/lrange";
import ltrim from "../src/ltrim";
import rpush from "../src/rpush";

test(`simple-push-pop`, async () => {
  const conn = await connect({
    host: "localhost"
  });

  const testKey = `naive-redis-queue`;
  const testValue = (index: number) =>
    JSON.stringify(JSON.stringify({ hello: `world`, index }));
  const expectedTestValue = (index: number) =>
    JSON.stringify({ hello: `world`, index });

  expect(await llen(conn, testKey)).toBe(0);
  expect(await lpop(conn, testKey)).toBeNull();
  expect(await lindex(conn, testKey, 0)).toBeNull();

  expect(await rpush(conn, testKey, testValue(0))).toBe(1);
  expect(await llen(conn, testKey)).toBe(1);

  expect(await rpush(conn, testKey, testValue(1))).toBe(2);
  expect(await llen(conn, testKey)).toBe(2);

  expect(await lindex(conn, testKey, 0)).toEqual(expectedTestValue(0));
  expect(await lindex(conn, testKey, 1)).toEqual(expectedTestValue(1));

  expect(await lpop(conn, testKey)).toEqual(expectedTestValue(0));
  expect(await llen(conn, testKey)).toBe(1);
  expect(await lindex(conn, testKey, 0)).toEqual(expectedTestValue(1));

  expect(await lpop(conn, testKey)).toEqual(expectedTestValue(1));
  expect(await llen(conn, testKey)).toBe(0);
  expect(await lindex(conn, testKey, 0)).toBeNull();
  expect(await lpop(conn, testKey)).toBeNull();

  conn.socket.disconnect();
});

test(`flush-queue`, async () => {
  const conn = await connect({
    host: "localhost"
  });

  const testKey = `naive-redis-queue-flush`;
  const testValue = [`a`, `b`, `c`, `d`, `e`];
  expect(await rpush(conn, testKey, ...testValue)).toBe(5);
  expect(await llen(conn, testKey)).toBe(5);
  expect(await lrange(conn, testKey, 0, -1)).toEqual(testValue);
  expect(await ltrim(conn, testKey, testValue.length)).toBeTruthy();

  conn.socket.disconnect();
});
