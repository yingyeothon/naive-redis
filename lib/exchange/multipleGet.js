"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ensureValue_1 = __importDefault(require("./ensureValue"));
const send_1 = __importDefault(require("./send"));
function multipleGet(connection, commands) {
    return send_1.default({
        connection,
        commands,
        match: m => {
            m.capture(`\r\n`);
            const first = m.value(0);
            if (!first || first === "*0" || first.startsWith("-")) {
                return m;
            }
            const count = +first.slice(1);
            for (let index = 0; index < count; ++index) {
                m.capture(`\r\n`).capture(`\r\n`);
            }
            return m;
        },
        transform: result => {
            const length = +ensureValue_1.default(result, 0, /\*([0-9]+)/);
            const values = result.filter((_, i) => i !== 0 && i % 2 === 0);
            if (length !== values.length) {
                throw new Error(`Error: mismatch length`);
            }
            return values;
        }
    });
}
exports.default = multipleGet;
//# sourceMappingURL=multipleGet.js.map