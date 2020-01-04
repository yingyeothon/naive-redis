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
    function doSend() {
        return connection.socket
            .send({
            message: commands.join(newline) + newline,
            fulfill: match_1.withMatch(match),
            timeoutMillis: connection.timeoutMillis
        })
            .then(response => transform(match(new match_1.default(response)).values()));
    }
    return connection.authenticated
        ? connection.authenticated.then(success => {
            if (!success) {
                throw new Error(`Invalid password`);
            }
            return doSend();
        })
        : doSend();
}
exports.default = send;
//# sourceMappingURL=send.js.map