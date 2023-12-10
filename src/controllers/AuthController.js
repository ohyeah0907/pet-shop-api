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
var app_response_1 = require("../handler/app-response");
var AuthService_1 = require("../services/AuthService");
var app_error_1 = require("../handler/app-error");
var controller = {
    login: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, AuthService_1.default.login(req.body.login)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, new app_response_1.SuccessResponse("Đăng nhập thành công", result).send(res)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, app_error_1.AppError.handle(error_1, res)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    signInWithGoogle: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var session, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    session = req.session;
                    console.log('session :>> ', session);
                    return [4 /*yield*/, AuthService_1.default.signInWithGoogle(session.passport.user)];
                case 1:
                    result = _a.sent();
                    if (result) {
                        return [2 /*return*/, new app_response_1.SuccessResponse('Đăng nhập thành công', result).send(res)];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, app_error_1.AppError.handle(error_2, res)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    register: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, AuthService_1.default.register(req.body.register)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, new app_response_1.SuccessResponse("Đăng ký thành công", result).send(res)];
                case 2:
                    error_3 = _a.sent();
                    return [2 /*return*/, app_error_1.AppError.handle(error_3, res)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    logout: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, AuthService_1.default.logout(req.user)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, new app_response_1.SuccessResponse("Đăng xuất thành công", result).send(res)];
                case 2:
                    error_4 = _a.sent();
                    return [2 /*return*/, app_error_1.AppError.handle(error_4, res)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    refreshToken: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var refreshToken, result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    refreshToken = req.body.refreshToken;
                    return [4 /*yield*/, AuthService_1.default.refreshToken(refreshToken)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, new app_response_1.SuccessResponse("Lấy token thành công", result).send(res)];
                case 2:
                    error_5 = _a.sent();
                    return [2 /*return*/, app_error_1.AppError.handle(error_5, res)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    resend: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, AuthService_1.default.resend(req.body.resend)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, new app_response_1.SuccessResponse("Bạn hãy check email để xác thực tài khoản!", result).send(res)];
                case 2:
                    error_6 = _a.sent();
                    return [2 /*return*/, app_error_1.AppError.handle(error_6, res)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    verify: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, AuthService_1.default.verify(req.params.token)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, new app_response_1.SuccessResponse("Xác thực thành công!", result).send(res)];
                case 2:
                    error_7 = _a.sent();
                    return [2 /*return*/, app_error_1.AppError.handle(error_7, res)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    info: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, accessToken, refreshToken, userInfo, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.headers, accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                    return [4 /*yield*/, AuthService_1.default.info(req.user)];
                case 1:
                    userInfo = _b.sent();
                    return [2 /*return*/, new app_response_1.SuccessResponse("Lấy thông tin thành công", userInfo).send(res)];
                case 2:
                    error_8 = _b.sent();
                    return [2 /*return*/, app_error_1.AppError.handle(error_8, res)];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = controller;