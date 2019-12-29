"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const match_1 = __importStar(require("@yingyeothon/naive-socket/lib/match"));
const newline = `\r\n`;
function send({ connection, commands, match, transform }) {
    const message = commands.join(newline) + newline;
    return connection.socket
        .send({
        message,
        fulfill: match_1.withMatcher(match),
        timeoutMillis: connection.timeoutMillis
    })
        .then(response => transform(match(new match_1.default(response)).values()));
}
exports.default = send;
//# sourceMappingURL=send.js.map