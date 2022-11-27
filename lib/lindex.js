"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const singleGet_1 = __importDefault(require("./exchange/singleGet"));
function redisLindex(connection, key, pos) {
    return (0, singleGet_1.default)(connection, [`LINDEX "${key}" ${pos}`]);
}
exports.default = redisLindex;
//# sourceMappingURL=lindex.js.map