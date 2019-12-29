"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ok_1 = __importDefault(require("./exchange/ok"));
function auth(connection, password) {
    return ok_1.default(connection, [`AUTH ${password}`]);
}
exports.default = auth;
//# sourceMappingURL=auth.js.map