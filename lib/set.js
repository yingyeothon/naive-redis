"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ensureValue_1 = __importDefault(require("./exchange/ensureValue"));
const send_1 = __importDefault(require("./send"));
function set(connection, key, value, { expirationMillis, onlySet } = {}) {
    const command = [`SET`, `"${key}"`, JSON.stringify(value)];
    if (expirationMillis !== undefined) {
        command.push(`PX`);
        command.push(expirationMillis.toString());
    }
    if (onlySet !== undefined) {
        command.push(onlySet.toUpperCase());
    }
    return send_1.default({
        connection,
        commands: [command.join(` `)],
        match: m => m.capture(`\r\n`),
        transform: result => ensureValue_1.default(result, 0, /(\+OK|\$-1)/) === "+OK"
    });
}
exports.default = set;
//# sourceMappingURL=set.js.map