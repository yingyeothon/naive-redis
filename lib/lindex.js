"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const singleGet_1 = __importDefault(require("./exchange/singleGet"));
function lindex(connection, key, pos) {
    return singleGet_1.default(connection, [`LINDEX "${key}" ${pos}`]);
}
exports.default = lindex;
//# sourceMappingURL=lindex.js.map