"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const naive_socket_1 = __importStar(require("@yingyeothon/naive-socket"));
const auth_1 = __importDefault(require("./auth"));
function connect({ host, port = 6379, password, timeoutMillis = 1000, }) {
    const socket = new naive_socket_1.default({
        host,
        port,
        onConnectionStateChanged: ({ state }) => {
            if (password && state === naive_socket_1.ConnectionState.Connected) {
                connection.authenticated = auth_1.default(connection, password);
            }
        },
    });
    const connection = {
        socket,
        timeoutMillis,
    };
    return connection;
}
exports.default = connect;
//# sourceMappingURL=connection.js.map