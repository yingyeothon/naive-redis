"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ensureValue_1 = __importDefault(require("./ensureValue"));
exports.match = (m) => {
    m.capture(`\r\n`);
    const count = m.value(0);
    if (!count || count === "$-1" || count.startsWith("-")) {
        return m;
    }
    return m.loop(0, () => m.capture(`\r\n`).capture(`\r\n`));
};
function singleGet(result) {
    const length = +ensureValue_1.default(result, 0, /\$(-?[0-9]+)/);
    const values = result.filter((_, i) => i !== 0 && i % 2 === 0);
    if (length !== values.length) {
        throw new Error(`Error: mismatch length`);
    }
    return values;
}
exports.default = singleGet;
//# sourceMappingURL=multipleGet.js.map