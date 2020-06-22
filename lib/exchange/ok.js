"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ensureValue_1 = __importDefault(require("./ensureValue"));
const send_1 = __importDefault(require("../send"));
function ok(connection, commands, { urgent } = {}) {
    return send_1.default({
        connection,
        commands,
        match: (m) => m.capture(`\r\n`),
        transform: (result) => ensureValue_1.default(result, 0, /\+(OK)/) === "OK",
        urgent,
    });
}
exports.default = ok;
//# sourceMappingURL=ok.js.map