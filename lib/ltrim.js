"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ok_1 = __importDefault(require("./exchange/ok"));
function ltrim(connection, key, start, end = -1) {
    return ok_1.default(connection, [`LTRIM "${key}" ${start} ${end}`]);
}
exports.default = ltrim;
//# sourceMappingURL=ltrim.js.map