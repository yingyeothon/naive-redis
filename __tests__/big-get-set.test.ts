import fixture from "./fixture";
import get from "../src/get";
import set from "../src/set";

fixture(`big-get-set`, async (connection) => {
  const testKey = `naive-redis-set-big`;
  const testValue = Array(1 << 18)
    .fill(0)
    .map((_, index) => index % 10)
    .join("");
  expect(
    await set(connection, testKey, testValue, {
      expirationMillis: 50000,
      onlySet: "nx",
    })
  ).toBe(true);
  expect(await get(connection, testKey)).toEqual(testValue);
});
