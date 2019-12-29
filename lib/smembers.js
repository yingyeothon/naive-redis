"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multipleGet_1 = __importDefault(require("./exchange/multipleGet"));
function smembers(connection, key) {
    return multipleGet_1.default(connection, [`SMEMBERS "${key}"`]);
}
exports.default = smembers;
//# sourceMappingURL=smembers.js.map