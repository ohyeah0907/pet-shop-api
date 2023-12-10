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
var client_1 = require("@prisma/client");
var CartItemRepository_1 = require("../repositories/CartItemRepository");
var CartService_1 = require("./CartService");
var PetService_1 = require("./PetService");
var AccessoryService_1 = require("./AccessoryService");
var service = {
    getSearch: function (search, include) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, CartItemRepository_1.default.findAll(search, include)];
        });
    }); },
    getById: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var cartItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, CartItemRepository_1.default.findById(id)];
                case 1:
                    cartItem = _a.sent();
                    if (!cartItem)
                        throw new Error("Không tìm thấy cart item");
                    return [2 /*return*/, cartItem];
            }
        });
    }); },
    create: function (create) { return __awaiter(void 0, void 0, void 0, function () {
        var cart, pet, accessory, cartItem, created;
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, CartService_1.default.getById((_a = create.cart) === null || _a === void 0 ? void 0 : _a.id)];
                case 1:
                    cart = _h.sent();
                    if (!((_b = create.pet) === null || _b === void 0 ? void 0 : _b.id)) return [3 /*break*/, 3];
                    return [4 /*yield*/, PetService_1.default.getById((_c = create.pet) === null || _c === void 0 ? void 0 : _c.id)];
                case 2:
                    pet = _h.sent();
                    _h.label = 3;
                case 3:
                    if (!((_d = create.accessory) === null || _d === void 0 ? void 0 : _d.id)) return [3 /*break*/, 5];
                    return [4 /*yield*/, AccessoryService_1.default.getById((_e = create.accessory) === null || _e === void 0 ? void 0 : _e.id)];
                case 4:
                    accessory = _h.sent();
                    _h.label = 5;
                case 5:
                    cartItem = {
                        id: 0,
                        cart_id: cart.id,
                        pet_id: (_f = create.pet) === null || _f === void 0 ? void 0 : _f.id,
                        accessory_id: (_g = create.accessory) === null || _g === void 0 ? void 0 : _g.id,
                        quantity: create.quantity,
                        total_price: create.total_price,
                    };
                    return [4 /*yield*/, CartItemRepository_1.default.save(cartItem)];
                case 6:
                    created = _h.sent();
                    return [2 /*return*/, created];
            }
        });
    }); },
    update: function (update) { return __awaiter(void 0, void 0, void 0, function () {
        var cartItem, cart, pet, accessory;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, service.getById(update.id)];
                case 1:
                    cartItem = _c.sent();
                    return [4 /*yield*/, CartService_1.default.getById(update.cart.id)];
                case 2:
                    cart = _c.sent();
                    cartItem.cart_id = cart.id;
                    if (!((_a = update.pet) === null || _a === void 0 ? void 0 : _a.id)) return [3 /*break*/, 4];
                    return [4 /*yield*/, PetService_1.default.getById(update.pet.id)];
                case 3:
                    pet = _c.sent();
                    cartItem.pet_id = pet.id;
                    cartItem.accessory_id = null;
                    _c.label = 4;
                case 4:
                    if (!((_b = update.accessory) === null || _b === void 0 ? void 0 : _b.id)) return [3 /*break*/, 6];
                    return [4 /*yield*/, AccessoryService_1.default.getById(update.accessory.id)];
                case 5:
                    accessory = _c.sent();
                    cartItem.accessory_id = accessory.id;
                    cartItem.pet_id = null;
                    _c.label = 6;
                case 6:
                    cartItem.quantity = update.quantity;
                    cartItem.total_price = update.total_price;
                    return [4 /*yield*/, CartItemRepository_1.default.save(cartItem)];
                case 7: return [2 /*return*/, _c.sent()];
            }
        });
    }); },
    delete: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var cartItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.getById(id)];
                case 1:
                    cartItem = _a.sent();
                    cartItem.state = client_1.ObjectState.DELETED;
                    cartItem.deleted_at = new Date();
                    return [4 /*yield*/, CartItemRepository_1.default.save(cartItem)];
                case 2: return [2 /*return*/, !!(_a.sent())];
            }
        });
    }); },
};
exports.default = service;
