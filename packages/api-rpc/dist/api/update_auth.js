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
var eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
var text_encoding_1 = require("text-encoding");
var fetch = require('node-fetch');
var update_auth = function (query) { return __awaiter(_this, void 0, void 0, function () {
    var endpoint, account_name, private_key, new_key, permission, parent_1, rpc, signatureProvider, api, generatedActions, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                endpoint = query.endpoint, account_name = query.account_name, private_key = query.private_key, new_key = query.new_key, permission = query.permission, parent_1 = query.parent;
                rpc = new eosjs_1.JsonRpc(endpoint, { fetch: fetch });
                signatureProvider = new eosjs_jssig_1.JsSignatureProvider([private_key]);
                api = new eosjs_1.Api({ rpc: rpc, signatureProvider: signatureProvider, textDecoder: new text_encoding_1.TextDecoder(), textEncoder: new text_encoding_1.TextEncoder() });
                generatedActions = [generate_action(account_name, permission, parent_1, new_key)];
                return [4 /*yield*/, api.transact({
                        actions: generatedActions
                    }, {
                        blocksBehind: 3,
                        expireSeconds: 30,
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
            case 2:
                e_1 = _a.sent();
                console.log('Caught exception: ' + e_1);
                throw (e_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
var generate_action = function (account_name, permission, parent, new_key) {
    return {
        account: "eosio",
        name: "updateauth",
        authorization: [{
                actor: account_name,
                permission: permission,
            }],
        data: {
            account: account_name,
            permission: permission,
            parent: parent,
            auth: {
                "threshold": 1,
                "keys": [
                    {
                        "key": new_key,
                        "weight": 1
                    }
                ],
                "accounts": [],
                "waits": []
            }
        }
    };
};
exports.default = update_auth;
