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
var passport_1 = require("passport");
var passport_local_1 = require("passport-local");
var UserService_1 = require("../services/UserService");
var bcrypt_1 = require("bcrypt");
var app_response_1 = require("../handler/app-response");
var LocalStrategy = passport_local_1.default.Strategy;
var initPassportLocal = function () {
    passport_1.default.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: true,
    }, function (req, email, password, done) { return __awaiter(void 0, void 0, void 0, function () {
        var user, isMatch, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, UserService_1.default.getUserByEmail(email)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        return [2 /*return*/, done(null, false, { message: "Kh\u00F4ng t\u00ECm th\u1EA5y email" })];
                    isMatch = bcrypt_1.default.compareSync(password, user.password);
                    if (!isMatch)
                        throw new Error("Sai thông tin tài khoản");
                    if (!user.is_verified)
                        throw new Error("T\u00E0i kho\u1EA3n ch\u01B0a \u0111\u01B0\u1EE3c x\u00E1c th\u1EF1c");
                    if (user.is_locked)
                        throw new Error("T\u00E0i kho\u1EA3n ch\u01B0a \u0111\u01B0\u1EE3c k\u00EDch ho\u1EA1t. Li\u00EAn h\u1EC7 v\u1EDBi admin \u0111\u1EC3 \u0111\u01B0\u1EE3c gi\u1EA3i quy\u1EBFt!");
                    return [2 /*return*/, done(null, user)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, new app_response_1.BadRequestResponse(error_1.message).send(req.res)];
                case 3: return [2 /*return*/];
            }
        });
    }); }));
};
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
exports.default = initPassportLocal;
