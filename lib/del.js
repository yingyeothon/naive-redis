"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const singleCount_1 = __importDefault(require("./exchange/singleCount"));
function redisDel(connection, ...keys) {
    return (0, singleCount_1.default)(connection, [
        `DEL ${keys.map((e) => `"${e}"`).join(" ")}`,
    ]);
}
exports.default = redisDel;
//# sourceMappingURL=del.js.map