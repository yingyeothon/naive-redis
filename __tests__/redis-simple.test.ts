import RedisSimple from "../src/simple";
import { testbed } from "./fixture";

interface Stuff {
  a: number;
  b: string;
}

testbed("redis-simple", async (config) => {
  const { get, set, del, cache } = new RedisSimple({ config });

  const stuff: Stuff = { a: 100, b: "world" };
  expect(await get<Stuff>("hello")).toBeNull();
  expect(await set("hello", stuff)).toBeTruthy();
  expect(await get<Stuff>("hello")).toEqual(stuff);
  expect(await del("hello")).toBe(1);
  expect(await get<Stuff>("hello")).toBeNull();

  async function universe() {
    return 42;
  }

  const cachedUniverse = cache(universe, { cacheKey: () => "cosmos" });
  expect(await cachedUniverse.peek()).toBeNull();
  expect(await cachedUniverse()).toBe(42);
  expect(await cachedUniverse.peek()).toBe(42);
  await cachedUniverse.clear();
  expect(await cachedUniverse.peek()).toBeNull();
  await cachedUniverse.refresh();
  expect(await cachedUniverse.peek()).toBe(42);
  expect(await cachedUniverse()).toBe(42);
});
