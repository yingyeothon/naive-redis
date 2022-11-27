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
const get_1 = __importDefault(require("../get"));
const set_1 = __importDefault(require("../set"));
const del_1 = __importDefault(require("./del"));
const get_2 = __importDefault(require("./get"));
const set_2 = __importDefault(require("./set"));
const work_1 = __importDefault(require("./work"));
function redisSimpleCache(fn, { config, cacheKey, expirationMillis, decode = JSON.parse, encode = JSON.stringify, }) {
    function computeIfAbsent(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = cacheKey(...args);
            return yield (0, work_1.default)(config, (connection) => __awaiter(this, void 0, void 0, function* () {
                const maybe = yield (0, get_1.default)(connection, key);
                if (maybe !== null) {
                    return decode(maybe);
                }
                const result = yield fn(...args);
                yield (0, set_1.default)(connection, key, encode(result), { expirationMillis });
                return result;
            }));
        });
    }
    function refresh(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, set_2.default)({
                config,
                key: cacheKey(...args),
                value: yield fn(...args),
                expirationMillis,
                encode,
            });
        });
    }
    function clear(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, del_1.default)({ config, key: cacheKey(...args) });
        });
    }
    function peek(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, get_2.default)({
                config,
                key: cacheKey(...args),
                decode,
            });
        });
    }
    computeIfAbsent.refresh = refresh;
    computeIfAbsent.clear = clear;
    computeIfAbsent.peek = peek;
    computeIfAbsent.fn = fn;
    return computeIfAbsent;
}
exports.default = redisSimpleCache;
//# sourceMappingURL=cache.js.map