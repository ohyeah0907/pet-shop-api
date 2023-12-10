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
var token_1 = require("../helper/token");
var KeyStoreRepository_1 = require("../repositories/KeyStoreRepository");
var UserService_1 = require("./UserService");
var bcrypt_1 = require("bcrypt");
var crypto_1 = require("crypto");
var mail_1 = require("../middleware/mail");
var uuid_1 = require("uuid");
var UserRepository_1 = require("../repositories/UserRepository");
var app_error_1 = require("../handler/app-error");
var service = {
    login: function (login) { return __awaiter(void 0, void 0, void 0, function () {
        var user, accessTokenKey, refreshTokenKey, result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, UserService_1.default.getUserByEmail(login.email)];
                case 1:
                    user = _b.sent();
                    if (!bcrypt_1.default.compareSync(login.password, user.password))
                        throw new Error("Mật khẩu không chính xác");
                    if (!user.is_verified)
                        throw new Error("Tài khoản chưa được xác thực");
                    if (user.is_locked)
                        throw new Error("Tài khoản đã bị khóa");
                    accessTokenKey = crypto_1.default.randomBytes(64).toString("hex");
                    refreshTokenKey = crypto_1.default.randomBytes(64).toString("hex");
                    return [4 /*yield*/, KeyStoreRepository_1.default.create(user, refreshTokenKey)];
                case 2:
                    _b.sent();
                    _a = {};
                    return [4 /*yield*/, (0, token_1.createTokens)(user, accessTokenKey, refreshTokenKey)];
                case 3:
                    result = (_a.tokens = _b.sent(),
                        _a.user = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            username: user.username,
                            isAdmin: user.is_admin,
                        },
                        _a);
                    return [2 /*return*/, result];
            }
        });
    }); },
    signInWithGoogle: function (userGoogle) { return __awaiter(void 0, void 0, void 0, function () {
        var profile, user, create, accessTokenKey, refreshTokenKey, result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    profile = userGoogle.profile;
                    if (!profile)
                        throw new app_error_1.AuthenticationFailure('Không tìm thấy thông tin từ google');
                    if (!profile._json.email_verified)
                        throw new app_error_1.AuthenticationFailure('Email này chưa được xác thực!');
                    user = null;
                    return [4 /*yield*/, UserRepository_1.default.findByEmail(profile._json.email)];
                case 1:
                    user = _b.sent();
                    if (!!user) return [3 /*break*/, 3];
                    create = {
                        name: profile._json.family_name + ' ' + profile._json.given_name,
                        email: profile._json.email,
                        avatar_url: profile._json.picture,
                        phone: '',
                        username: profile._json.email.split('@')[0],
                        google_id: profile.id,
                        verification_token: '',
                        password: '',
                        is_voice: true,
                        is_locked: true,
                        is_verified: true,
                    };
                    return [4 /*yield*/, UserRepository_1.default.save(create)];
                case 2:
                    user = _b.sent();
                    _b.label = 3;
                case 3:
                    accessTokenKey = crypto_1.default.randomBytes(64).toString("hex");
                    refreshTokenKey = crypto_1.default.randomBytes(64).toString("hex");
                    return [4 /*yield*/, KeyStoreRepository_1.default.create(user, refreshTokenKey)];
                case 4:
                    _b.sent();
                    _a = {};
                    return [4 /*yield*/, (0, token_1.createTokens)(user, accessTokenKey, refreshTokenKey)];
                case 5:
                    result = (_a.tokens = _b.sent(),
                        _a.user = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            username: user.username,
                            isAdmin: user.is_admin,
                        },
                        _a);
                    return [2 /*return*/, result];
            }
        });
    }); },
    logout: function (user) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, KeyStoreRepository_1.default.removeAllForClient(user)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    }); },
    register: function (register) { return __awaiter(void 0, void 0, void 0, function () {
        var user, userCreate, newUser, emailResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserRepository_1.default.findByEmail(register.email)];
                case 1:
                    user = _a.sent();
                    if (user != null)
                        throw new Error("Email \u0111\u00E3 t\u1ED3n t\u1EA1i");
                    userCreate = {
                        name: "",
                        email: register.email,
                        phone: "",
                        verification_token: (0, uuid_1.v4)(),
                        username: register.email,
                        password: bcrypt_1.default.hashSync(register.password, 10),
                        is_voice: true,
                        is_locked: false,
                        is_verified: false,
                    };
                    return [4 /*yield*/, UserRepository_1.default.save(userCreate)];
                case 2:
                    newUser = _a.sent();
                    return [4 /*yield*/, (0, mail_1.sendMailVerification)(newUser.email, newUser.verification_token)];
                case 3:
                    emailResult = _a.sent();
                    if (!emailResult)
                        throw new Error("G\u1EEDi mail th\u1EA5t b\u1EA1i");
                    return [2 /*return*/, true];
            }
        });
    }); },
    resend: function (resend) { return __awaiter(void 0, void 0, void 0, function () {
        var user, emailResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserRepository_1.default.findByEmail(resend.email)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new Error("Kh\u00F4ng t\u00ECm th\u1EA5y email");
                    return [4 /*yield*/, (0, mail_1.sendMailVerification)(user.email, user.verification_token)];
                case 2:
                    emailResult = _a.sent();
                    if (!emailResult)
                        throw new Error("G\u1EEDi mail th\u1EA5t b\u1EA1i");
                    return [2 /*return*/, true];
            }
        });
    }); },
    verify: function (token) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserRepository_1.default.findByVerificationToken(token)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new Error("Token kh\u00F4ng h\u1EE3p l\u1EC7");
                    user.is_verified = true;
                    user.verification_token = "";
                    user.verified_at = new Date();
                    return [4 /*yield*/, UserRepository_1.default.save(user)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    }); },
    info: function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var userResponse;
        return __generator(this, function (_a) {
            userResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                username: user.username,
                isAdmin: user.is_admin,
            };
            return [2 /*return*/, userResponse];
        });
    }); },
    refreshToken: function (refreshToken) { return __awaiter(void 0, void 0, void 0, function () {
        var keyStore, accessTokenKey, result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, KeyStoreRepository_1.default.findByRefreshToken(refreshToken)];
                case 1:
                    keyStore = _b.sent();
                    if (!keyStore)
                        throw new app_error_1.NotFound('Không tìm thấy refresh token');
                    accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
                    _a = {};
                    return [4 /*yield*/, (0, token_1.createAccessToken)(keyStore.client_id, accessTokenKey)];
                case 2:
                    result = (_a.access_token = _b.sent(),
                        _a);
                    return [2 /*return*/, result];
            }
        });
    }); }
};
exports.default = service;
