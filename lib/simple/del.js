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
const del_1 = __importDefault(require("../del"));
const work_1 = __importDefault(require("./work"));
function redisSimpleDel({ config, key, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, work_1.default)(config, (connection) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, del_1.default)(connection, key);
        }));
    });
}
exports.default = redisSimpleDel;
//# sourceMappingURL=del.js.map