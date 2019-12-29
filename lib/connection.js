"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const naive_socket_1 = __importDefault(require("@yingyeothon/naive-socket"));
const auth_1 = __importDefault(require("./auth"));
function connect({ host, port = 6379, password, timeoutMillis = 1000 }) {
    const socket = new naive_socket_1.default({
        host,
        port
    });
    const connection = {
        socket,
        timeoutMillis
    };
    if (password) {
        connection.authenticated = auth_1.default(connection, password);
    }
    return connection;
}
exports.default = connect;
//# sourceMappingURL=connection.js.map