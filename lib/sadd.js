"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const singleCount_1 = __importDefault(require("./exchange/singleCount"));
function redisSadd(connection, key, ...values) {
    return singleCount_1.default(connection, [
        `SADD "${key}" ${values.map((value) => JSON.stringify(value)).join(" ")}`,
    ]);
}
exports.default = redisSadd;
//# sourceMappingURL=sadd.js.map