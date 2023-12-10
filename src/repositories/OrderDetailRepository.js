"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var prisma_1 = require("../prisma");
var client_1 = require("@prisma/client");
var findAll = function (search, include) { return __awaiter(void 0, void 0, void 0, function () {
    var condition, orderDetails;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                condition = {};
                if (search === null || search === void 0 ? void 0 : search.order) {
                    condition.order_id = search.order.id;
                }
                if (search === null || search === void 0 ? void 0 : search.state) {
                    condition.state = search.state;
                }
                if (search === null || search === void 0 ? void 0 : search.someStates) {
                    condition.state = {
                        in: search.someStates,
                    };
                }
                if ((search === null || search === void 0 ? void 0 : search.notInIds) && Array.isArray(search.notInIds)) {
                    condition.id = {
                        notIn: search.notInIds,
                    };
                }
                return [4 /*yield*/, prisma_1.default.orderDetail.findMany({
                        where: __assign({ state: client_1.ObjectState.ACTIVE }, condition),
                        include: __assign({ pet: { select: { name: true } }, accessory: { select: { name: true } }, order: {
                                include: {
                                    user: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            } }, (include || {})),
                    })];
            case 1:
                orderDetails = _a.sent();
                return [2 /*return*/, orderDetails];
        }
    });
}); };
var findById = function (id, include) { return __awaiter(void 0, void 0, void 0, function () {
    var orderDetail;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.default.orderDetail.findUnique({
                    include: __assign({}, (include || {})),
                    where: {
                        id: id,
                        state: client_1.ObjectState.ACTIVE,
                    },
                })];
            case 1:
                orderDetail = _a.sent();
                return [2 /*return*/, orderDetail];
        }
    });
}); };
var save = function (orderDetail, include) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!orderDetail.id) return [3 /*break*/, 2];
                return [4 /*yield*/, prisma_1.default.orderDetail.update({
                        where: {
                            id: orderDetail.id,
                        },
                        data: {
                            order: {
                                connect: {
                                    id: orderDetail.order_id,
                                },
                            },
                            pet: orderDetail.pet_id
                                ? {
                                    connect: {
                                        id: orderDetail.pet_id,
                                    },
                                }
                                : { disconnect: true },
                            accessory: orderDetail.accessory_id
                                ? {
                                    connect: {
                                        id: orderDetail.accessory_id,
                                    },
                                }
                                : { disconnect: true },
                            quantity: orderDetail.quantity,
                            price: orderDetail.price,
                            state: orderDetail.state,
                            deleted_at: orderDetail.deleted_at,
                        },
                        include: __assign({}, (include || {})),
                    })];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [4 /*yield*/, prisma_1.default.orderDetail.create({
                    data: {
                        order: {
                            connect: {
                                id: orderDetail.order_id,
                            },
                        },
                        pet: {
                            connect: orderDetail.pet_id ? { id: orderDetail.pet_id } : undefined,
                        },
                        accessory: {
                            connect: orderDetail.accessory_id
                                ? { id: orderDetail.accessory_id }
                                : undefined,
                        },
                        quantity: orderDetail.quantity,
                        price: orderDetail.price,
                    },
                    include: __assign({}, (include || {})),
                })];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.default = {
    findAll: findAll,
    findById: findById,
    save: save,
};