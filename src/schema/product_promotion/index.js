"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
exports.default = {
    productPromotionCreate: joi_1.default.object().keys({
        create: joi_1.default.object()
            .keys({
            pet: joi_1.default.object().keys({
                id: joi_1.default.number().allow(null),
            }),
            accessory: joi_1.default.object().keys({
                id: joi_1.default.number().allow(null),
            }),
            promotion: joi_1.default.object().keys({
                id: joi_1.default.number().required(),
            }),
        })
            .required(),
    }),
    productPromotionUpdate: joi_1.default.object().keys({
        update: joi_1.default.object()
            .keys({
            id: joi_1.default.number().required(),
            pet: joi_1.default.object().keys({
                id: joi_1.default.number().allow(null),
            }),
            accessory: joi_1.default.object().keys({
                id: joi_1.default.number().allow(null),
            }),
            promotion: joi_1.default.object().keys({
                id: joi_1.default.number().required(),
            }),
        })
            .or("pet.id", "accessory.id")
            .required(),
    }),
};
