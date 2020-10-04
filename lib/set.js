"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ensureValue_1 = __importDefault(require("./exchange/ensureValue"));
const send_1 = __importDefault(require("./send"));
function redisSet(connection, key, value, { expirationMillis, onlySet } = {}) {
    const command = [`SET`, key, value];
    if (expirationMillis !== undefined) {
        command.push(`PX`);
        command.push(expirationMillis.toString());
    }
    if (onlySet !== undefined) {
        command.push(onlySet.toUpperCase());
    }
    return send_1.default({
        connection,
        commands: [serializeCommand(command)],
        match: (m) => m.capture(`\r\n`),
        transform: (result) => ensureValue_1.default(result, 0, /(\+OK|\$-1)/) === "+OK",
    });
}
exports.default = redisSet;
function serializeCommand(command) {
    const totalLength = command
        .map((part) => part.length)
        .reduce((a, b) => a + b, 0);
    const maxInlineRequestLength = 1 << 16;
    if (totalLength <= maxInlineRequestLength &&
        command.every((part) => !part.includes(`"`))) {
        return command.join(` `);
    }
    const lines = [];
    lines.push(`*${command.length}`);
    for (const part of command) {
        const partLength = part.length;
        lines.push(`$${partLength}`);
        lines.push(part);
    }
    return lines.join(`\r\n`) + `\r\n`;
}
//# sourceMappingURL=set.js.map