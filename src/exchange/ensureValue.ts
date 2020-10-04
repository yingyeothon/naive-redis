function ensureGet(result: string[], index: number) {
  if (!result || !result[index]) {
    throw new Error(`Error: empty response`);
  }
  if (result[index].startsWith("-")) {
    throw new Error(`Error: ${result[0]}`);
  }
  return result[index];
}

export default function ensureValue(
  result: string[],
  index: number,
  expected: RegExp
): string {
  const value = ensureGet(result, index);
  if (expected instanceof RegExp) {
    const match = value.match(expected);
    if (!match) {
      throw new Error(`Not expected: ${value}`);
    }
    return match[1];
  }
  return value;
}
