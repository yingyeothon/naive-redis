"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ensureGet(result, index) {
    if (!result || !result[index]) {
        throw new Error(`Error: empty response`);
    }
    if (result[index].startsWith("-")) {
        throw new Error(`Error: ${result[0]}`);
    }
    return result[index];
}
function ensureValue(result, index, expected) {
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
exports.default = ensureValue;
//# sourceMappingURL=ensureValue.js.map