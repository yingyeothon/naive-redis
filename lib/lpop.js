"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const singleGet_1 = __importDefault(require("./exchange/singleGet"));
function lpop(connection, key) {
    return singleGet_1.default(connection, [`LPOP "${key}"`]);
}
exports.default = lpop;
//# sourceMappingURL=lpop.js.map