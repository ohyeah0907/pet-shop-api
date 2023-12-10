"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var joi_1 = require("joi");
exports.default = {
    orderCreate: joi_1.default.object().keys({
        create: joi_1.default.object()
            .keys({
            user: joi_1.default.object()
                .keys({
                id: joi_1.default.number().required(),
            })
                .required(),
            order_status: (_a = joi_1.default.string())
                .valid.apply(_a, Object.values(client_1.OrderStatus)).required(),
            payment: (_b = joi_1.default.string())
                .valid.apply(_b, Object.values(client_1.Payment)).required(),
        })
            .required(),
    }),
    orderUpdate: joi_1.default.object().keys({
        update: joi_1.default.object()
            .keys({
            id: joi_1.default.number().required(),
            user: joi_1.default.object()
                .keys({
                id: joi_1.default.number().required(),
            })
                .required(),
            order_status: (_c = joi_1.default.string())
                .valid.apply(_c, Object.values(client_1.OrderStatus)).required(),
            payment: (_d = joi_1.default.string())
                .valid.apply(_d, Object.values(client_1.Payment)).required(),
        })
            .required(),
    }),
};
