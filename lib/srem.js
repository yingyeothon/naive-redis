"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const singleCount_1 = __importDefault(require("./exchange/singleCount"));
function redisSrem(connection, key, ...values) {
    return (0, singleCount_1.default)(connection, [
        `SREM "${key}" ${values.map((value) => JSON.stringify(value)).join(" ")}`,
    ]);
}
exports.default = redisSrem;
//# sourceMappingURL=srem.js.map