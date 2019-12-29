"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ensureValue_1 = __importDefault(require("./ensureValue"));
exports.match = (m) => m.capture(`\r\n`);
function singleCount(result) {
    const count = ensureValue_1.default(result, 0, /:([0-9]+)/);
    return +count;
}
exports.default = singleCount;
//# sourceMappingURL=singleCount.js.map