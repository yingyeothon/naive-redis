import exists from "../src/exists";
import fixture from "./fixture";
import set from "../src/set";

fixture("simple-exists", async (connection) => {
  expect(await set(connection, "key1", "Hello")).toBe(true);
  expect(await exists(connection, "key1")).toBe(1);

  expect(await exists(connection, "nosuchkey")).toBe(0);

  expect(await set(connection, "key2", "World")).toBe(true);
  expect(await exists(connection, "key1", "key2", "nosuchkey")).toBe(2);
});
