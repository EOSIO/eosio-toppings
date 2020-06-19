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
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var get_permissions_by_public_key = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var endpoint_1, public_key_1, records_count, limit, scopeStr, keyseg, scope, i, options, req, result;
    return __generator(this, function (_a) {
        try {
            endpoint_1 = query.endpoint, public_key_1 = query.public_key, records_count = query.records_count;
            limit = Math.min(parseInt(records_count) || 100, 100);
            scopeStr = "";
            keyseg = "";
            // calculate the lower bound and upper bound
            if (typeof public_key_1 !== 'undefined' && public_key_1.length >= 7) {
                if (public_key_1.substr(0, 3) == "EOS") {
                    keyseg = public_key_1.substr(3);
                }
                else if (public_key_1.substr(0, 7) == "PUB_R1_" || public_key_1.substr(0, 7) == "PUB_WA_") {
                    keyseg = public_key_1.substr(7);
                }
                else {
                    // not supported key format
                    // TODO: may support PUB_K1_ by adding key format converting
                    keyseg = "";
                }
            }
            if (keyseg != "" && keyseg.length >= 8) {
                scope = BigInt(0);
                for (i = 0; i < 8; ++i) {
                    scope = (scope * BigInt(256)) + BigInt(keyseg.charCodeAt(i));
                    // console.log("i: ", i, " scope: ", scope);
                }
                scopeStr = scope.toString();
            }
            else {
                // failure, the key is not recognized
                return [2 /*return*/, []];
            }
            options = {
                "json": true,
                "code": "eosio.accnts",
                "scope": scopeStr,
                "table": "pubkeys",
                "table_key": "",
                "lower_bound": "",
                "upper_bound": "",
                "limit": limit,
                "key_type": "",
                "index_position": "",
                "encode_type": "dec",
                "reverse": false,
                "show_payer": false
            };
            req = new Promise(function (resolve, reject) {
                request.post({ url: endpoint_1 + "/v1/chain/get_table_rows", json: true, body: options }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        // console.log("body: ", body);
                        resolve(body.rows);
                    }
                });
            });
            result = req.then(function (res) {
                // res[0].keyseg = "comment";
                // console.log("then result: ", res);
                res = res.filter(function (value, index, array) {
                    return value.keypermslist.some(function (value, index, array) {
                        return value.key == public_key_1;
                    });
                });
                res = res.map(function (value, index, array) {
                    value.keypermslist = value.keypermslist.filter(function (value, inidex, array) {
                        return value.key == public_key_1;
                    });
                    return value;
                });
                return res;
            });
            return [2 /*return*/, result];
        }
        catch (error) {
            console.error('Caught exception in get all permissions query: ', error.stack);
            return [2 /*return*/, []];
        }
        ;
        return [2 /*return*/];
    });
}); };
exports.default = get_permissions_by_public_key;
