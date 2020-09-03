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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __importDefault(require("../models/actions"));
function sanitizeInput(value) {
    if (typeof value === 'string') {
        return value.trim();
    }
    if (typeof value === 'number') {
        return value;
    }
    return value;
}
function parseInput(value) {
    if (typeof value === 'string') {
        return parseInt(value);
    }
    if (typeof value === 'number') {
        return value;
    }
    return value;
}
var get_action_details = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, block_num, _b, global_sequence, result, max_int32_value, query_gen, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = query.block_num, block_num = _a === void 0 ? "" : _a, _b = query.global_sequence, global_sequence = _b === void 0 ? "" : _b;
                result = void 0;
                max_int32_value = 2147483647;
                query_gen = actions_1.default
                    .find({});
                if (sanitizeInput(block_num) === "") {
                    throw ("invalid block number");
                }
                else if (sanitizeInput(global_sequence) === "") {
                    throw ("invalid sequence number");
                }
                else {
                    //Check if the number is greater than max int32 value. 
                    //After this value mongodb converts int32 type to string
                    block_num = (parseInput(block_num) > max_int32_value) ?
                        block_num : parseInput(block_num);
                    global_sequence = (parseInput(global_sequence) > max_int32_value) ?
                        global_sequence : parseInput(global_sequence);
                    query_gen.and([
                        { "block_num": block_num },
                        { "receipt.global_sequence": global_sequence }
                    ]);
                }
                return [4 /*yield*/, query_gen.exec()];
            case 1:
                result = _c.sent();
                return [2 /*return*/, result];
            case 2:
                err_1 = _c.sent();
                console.log(err_1);
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = get_action_details;
