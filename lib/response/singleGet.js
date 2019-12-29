"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ensureValue_1 = __importDefault(require("./ensureValue"));
exports.match = (m) => {
    m.capture(`\r\n`);
    return m.value(0) === "$-1" || m.value(0).startsWith("-")
        ? m
        : m.capture(`\r\n`);
};
function singleGet(result) {
    const length = ensureValue_1.default(result, 0, /\$(-?[0-9]+)/);
    return length === "-1" ? null : result[1];
}
exports.default = singleGet;
//# sourceMappingURL=singleGet.js.map