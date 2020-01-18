import del from "../src/del";
import get from "../src/get";
import set from "../src/set";
import fixture from "./fixture";

fixture("simple-promise-all", async connection => {
  const testKeyPrefix = `naive-redis-simple-promise-all-`;
  const testCount = 100;

  const setPromises: Array<Promise<boolean>> = [];
  for (let index = 0; index < testCount; ++index) {
    setPromises.push(set(connection, testKeyPrefix + index, index.toString()));
  }
  const allSet = await Promise.all(setPromises);
  expect(allSet.every(Boolean)).toBeTruthy();

  const getPromises: Array<Promise<string>> = [];
  for (let index = 0; index < testCount; ++index) {
    getPromises.push(
      get(connection, testKeyPrefix + index).then(result => result!)
    );
  }
  const allGet = await Promise.all(getPromises);
  expect(
    allGet.filter((each, index) => index === +each).every(Boolean)
  ).toBeTruthy();

  const delPromises: Array<Promise<number>> = [];
  for (let index = 0; index < testCount; ++index) {
    delPromises.push(del(connection, testKeyPrefix + index));
  }
  const allDel = await Promise.all(delPromises);
  expect(allDel.filter(each => each === 1).every(Boolean)).toBeTruthy();
});
