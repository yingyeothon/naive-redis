"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const singleCount_1 = __importDefault(require("./exchange/singleCount"));
function llen(connection, key) {
    return singleCount_1.default(connection, [`LLEN "${key}"`]);
}
exports.default = llen;
//# sourceMappingURL=llen.js.map