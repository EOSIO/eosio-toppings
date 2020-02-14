"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var eosjs_1 = require("eosjs");
var fetch = require('node-fetch');
var get_table_rows = function (query) { return __awaiter(_this, void 0, void 0, function () {
    var endpoint, contract_name, table_name, scope_name, _a, index_position, _b, key_type, _c, encode_type, _d, upper_bound, _e, lower_bound, _f, reverse, rpc, result, e_1;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 2, , 3]);
                endpoint = query.endpoint, contract_name = query.contract_name, table_name = query.table_name, scope_name = query.scope_name, _a = query.index_position, index_position = _a === void 0 ? 1 : _a, _b = query.key_type, key_type = _b === void 0 ? '' : _b, _c = query.encode_type, encode_type = _c === void 0 ? '' : _c, _d = query.upper_bound, upper_bound = _d === void 0 ? '' : _d, _e = query.lower_bound, lower_bound = _e === void 0 ? '' : _e, _f = query.reverse, reverse = _f === void 0 ? false : _f;
                rpc = new eosjs_1.JsonRpc(endpoint, { fetch: fetch });
                return [4 /*yield*/, rpc.get_table_rows({
                        "json": true,
                        "code": contract_name,
                        "scope": scope_name,
                        "table": table_name,
                        "index_position": index_position,
                        "key_type": key_type,
                        "encode_type": encode_type,
                        "upper_bound": upper_bound,
                        "lower_bound": lower_bound,
                        "reverse": reverse
                    })];
            case 1:
                result = _g.sent();
                return [2 /*return*/, result.rows];
            case 2:
                e_1 = _g.sent();
                console.log('Caught exception: ' + e_1);
                throw (e_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = get_table_rows;
