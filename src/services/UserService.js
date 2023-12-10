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
var UserRepository_1 = require("../repositories/UserRepository");
var client_1 = require("@prisma/client");
var bcrypt_1 = require("bcrypt");
var service = {
    getUserSearch: function (search) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, UserRepository_1.default.findAll(search)];
        });
    }); },
    getUserById: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserRepository_1.default.findById(id)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new Error("Không tìm thấy user");
                    return [2 /*return*/, user];
            }
        });
    }); },
    getUserByVerificationToken: function (token) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserRepository_1.default.findByVerificationToken(token)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    }); },
    getUserByEmail: function (email) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserRepository_1.default.findByEmail(email)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new Error("Không tìm thấy email");
                    return [2 /*return*/, user];
            }
        });
    }); },
    getUserByUserName: function (username) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserRepository_1.default.findByUsername(username)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw new Error("Không tìm thấy username");
                    return [2 /*return*/, user];
            }
        });
    }); },
    createUser: function (create) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        id: 0,
                        name: create.name,
                        email: create.email,
                        phone: create.phone,
                        username: create.username,
                        verification_token: create.verification_token || "",
                        password: bcrypt_1.default.hashSync(create.password, 10),
                        is_voice: true,
                    };
                    return [4 /*yield*/, UserRepository_1.default.save(user)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    updateUser: function (update) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.getUserById(update.id)];
                case 1:
                    user = _a.sent();
                    if (update.name) {
                        user.name = update.name;
                    }
                    if (update.email) {
                        user.email = update.email;
                    }
                    if (update.phone) {
                        user.phone = update.phone;
                    }
                    if (update.username) {
                        user.username = update.username;
                    }
                    if (update.password) {
                        user.password = update.password;
                    }
                    if (update.is_admin !== null) {
                        user.is_admin = update.is_admin;
                    }
                    if (update.is_locked !== null) {
                        user.is_locked = update.is_locked;
                    }
                    if (update.is_voice !== null) {
                        user.is_voice = update.is_voice;
                    }
                    if (update.is_verified !== null) {
                        user.is_verified = update.is_verified;
                    }
                    return [4 /*yield*/, UserRepository_1.default.save(user)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    deleteUser: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.getUserById(id)];
                case 1:
                    user = _a.sent();
                    user.state = client_1.ObjectState.DELETED;
                    user.deleted_at = new Date();
                    return [4 /*yield*/, UserRepository_1.default.save(user)];
                case 2: return [2 /*return*/, !!(_a.sent())];
            }
        });
    }); },
};
exports.default = service;
