"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
exports.default = {
    cartItemCreate: joi_1.default.object().keys({
        create: joi_1.default.object()
            .keys({
            cart: joi_1.default.object()
                .keys({
                id: joi_1.default.number().required(),
            })
                .required(),
            pet: joi_1.default.object()
                .keys({
                id: joi_1.default.number().allow(null),
            })
                .required(),
            accessory: joi_1.default.object()
                .keys({
                id: joi_1.default.number().allow(null),
            })
                .required(),
            quantity: joi_1.default.number().required(),
            total_price: joi_1.default.number().required(),
        })
            .required(),
    }),
    cartItemUpdate: joi_1.default.object().keys({
        update: joi_1.default.object()
            .keys({
            id: joi_1.default.number().required(),
            cart: joi_1.default.object()
                .keys({
                id: joi_1.default.number().required(),
            })
                .required(),
            pet: joi_1.default.object()
                .keys({
                id: joi_1.default.number().allow(null),
            })
                .required(),
            accessory: joi_1.default.object()
                .keys({
                id: joi_1.default.number().allow(null),
            })
                .required(),
            quantity: joi_1.default.number().required(),
            total_price: joi_1.default.number().required(),
        })
            .required(),
    }),
};
