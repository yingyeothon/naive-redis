"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ensureValue_1 = __importDefault(require("./ensureValue"));
const send_1 = __importDefault(require("../send"));
function singleCount(connection, commands) {
    return (0, send_1.default)({
        connection,
        commands,
        match: (m) => m.capture(`\r\n`),
        transform: (result) => +(0, ensureValue_1.default)(result, 0, /:([0-9]+)/),
    });
}
exports.default = singleCount;
//# sourceMappingURL=singleCount.js.map