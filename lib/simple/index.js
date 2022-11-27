"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = __importDefault(require("./cache"));
const del_1 = __importDefault(require("./del"));
const get_1 = __importDefault(require("./get"));
const set_1 = __importDefault(require("./set"));
class RedisSimple {
    constructor({ config, encode = JSON.stringify, decode = JSON.parse, keyPrefix = "", }) {
        this.cache = (fn, { cacheKey, expirationMillis, }) => {
            return (0, cache_1.default)(fn, {
                config: this.config,
                cacheKey: (...args) => this.keyPrefix + cacheKey(...args),
                encode: this.encode,
                decode: this.decode,
                expirationMillis: expirationMillis,
            });
        };
        this.get = (key) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, get_1.default)({
                config: this.config,
                key,
                decode: this.decode,
            });
        });
        this.set = (key, value, expirationMillis) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, set_1.default)({
                config: this.config,
                key,
                value,
                expirationMillis,
                encode: this.encode,
            });
        });
        this.del = (key) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, del_1.default)({ config: this.config, key });
        });
        this.config = config;
        this.encode = encode;
        this.decode = decode;
        this.keyPrefix = keyPrefix;
    }
}
exports.default = RedisSimple;
//# sourceMappingURL=index.js.map