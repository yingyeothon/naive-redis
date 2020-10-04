"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multipleGet_1 = __importDefault(require("./exchange/multipleGet"));
function redisLrange(connection, key, start, end = -1) {
    return multipleGet_1.default(connection, [`LRANGE "${key}" ${start} ${end}`]);
}
exports.default = redisLrange;
//# sourceMappingURL=lrange.js.map