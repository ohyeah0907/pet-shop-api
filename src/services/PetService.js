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
var PetRepository_1 = require("../repositories/PetRepository");
var PetTypeService_1 = require("./PetTypeService");
var service = {
    getSearch: function (search) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, PetRepository_1.default.findAll(search)];
        });
    }); },
    getById: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var pet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, PetRepository_1.default.findById(id)];
                case 1:
                    pet = _a.sent();
                    if (!pet)
                        throw new Error("Không tìm thấy pet");
                    return [2 /*return*/, pet];
            }
        });
    }); },
    create: function (create) { return __awaiter(void 0, void 0, void 0, function () {
        var pet, created;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pet = {
                        id: 0,
                        name: create.name,
                        sku: create.sku,
                        stock_quantity: create.stock_quantity,
                        price: create.price,
                        thumbnail_image: create.thumbnail_image,
                        description_images: create.description_images,
                        age: create.age,
                        isMale: create.isMale,
                        color: create.color,
                        weight: create.weight,
                        height: create.height,
                        birthday: new Date(create.birthday),
                        origin: create.origin,
                        description: create.description,
                        type_id: create.type.id,
                    };
                    return [4 /*yield*/, PetRepository_1.default.save(pet)];
                case 1:
                    created = _a.sent();
                    return [2 /*return*/, created];
            }
        });
    }); },
    update: function (update) { return __awaiter(void 0, void 0, void 0, function () {
        var pet, type;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.getById(update.id)];
                case 1:
                    pet = _a.sent();
                    return [4 /*yield*/, PetTypeService_1.default.getById(update.type.id)];
                case 2:
                    type = _a.sent();
                    pet.type_id = type.id;
                    pet.name = update.name;
                    pet.sku = update.sku;
                    pet.stock_quantity = update.stock_quantity;
                    pet.price = update.price;
                    pet.thumbnail_image = update.thumbnail_image;
                    pet.description_images = update.description_images;
                    pet.age = update.age;
                    pet.color = update.color;
                    pet.weight = update.weight;
                    pet.height = update.height;
                    pet.birthday = new Date(update.birthday);
                    pet.origin = update.origin;
                    pet.description = update.description;
                    pet.isMale = update.isMale;
                    return [4 /*yield*/, PetRepository_1.default.save(pet)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    delete: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var pet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.getById(id)];
                case 1:
                    pet = _a.sent();
                    pet.state = client_1.ObjectState.DELETED;
                    pet.deleted_at = new Date();
                    return [4 /*yield*/, PetRepository_1.default.save(pet)];
                case 2: return [2 /*return*/, !!(_a.sent())];
            }
        });
    }); },
};
exports.default = service;
