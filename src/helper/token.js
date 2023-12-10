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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.createAccessToken = exports.createTokens = exports.validateTokenData = exports.getAccessToken = void 0;
var app_error_1 = require("../handler/app-error");
var jwt_1 = require("../core/jwt");
var token_1 = require("../config/token");
var getAccessToken = function (authorization) {
    if (!authorization)
        throw new app_error_1.AuthenticationFailure('Invalid Authorization');
    if (!authorization.startsWith('Bearer '))
        throw new app_error_1.AuthenticationFailure('Invalid Authorization');
    return authorization.split(' ')[1];
};
exports.getAccessToken = getAccessToken;
var validateTokenData = function (payload) {
    if (!payload ||
        !payload.iss ||
        !payload.sub ||
        !payload.aud ||
        !payload.prm ||
        payload.iss !== token_1.tokenConfig.issuer ||
        payload.aud !== token_1.tokenConfig.audience ||
        !payload.sub)
        throw new app_error_1.AuthenticationFailure('Invalid Access Token');
    return true;
};
exports.validateTokenData = validateTokenData;
var createTokens = function (user, accessTokenKey, refreshTokenKey) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, jwt_1.default.encode(new jwt_1.JwtPayload(token_1.tokenConfig.issuer, token_1.tokenConfig.audience, user.id.toString(), accessTokenKey, token_1.tokenConfig.accessTokenValidity))];
            case 1:
                accessToken = _a.sent();
                if (!accessToken)
                    throw new app_error_1.InternalServerError();
                return [2 /*return*/, {
                        accessToken: accessToken,
                        refreshToken: refreshTokenKey,
                    }];
        }
    });
}); };
exports.createTokens = createTokens;
var createAccessToken = function (userId, accessTokenKey) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, jwt_1.default.encode(new jwt_1.JwtPayload(token_1.tokenConfig.issuer, token_1.tokenConfig.audience, userId.toString(), accessTokenKey, token_1.tokenConfig.accessTokenValidity))];
            case 1:
                accessToken = _a.sent();
                if (!accessToken)
                    throw new app_error_1.InternalServerError();
                return [2 /*return*/, accessToken];
        }
    });
}); };
exports.createAccessToken = createAccessToken;
