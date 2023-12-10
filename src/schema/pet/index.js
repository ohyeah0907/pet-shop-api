"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
exports.default = {
    petCreate: joi_1.default.object().keys({
        create: joi_1.default.object()
            .keys({
            name: joi_1.default.string().required().trim(),
            sku: joi_1.default.string().required().trim(),
            stock_quantity: joi_1.default.number().required(),
            price: joi_1.default.number().required(),
            thumbnail_image: joi_1.default.string().required().trim(),
            description_images: joi_1.default.array().items(joi_1.default.string().trim()).required(),
            age: joi_1.default.number().required(),
            isMale: joi_1.default.boolean().required(),
            color: joi_1.default.string().required().trim(),
            weight: joi_1.default.number().required(),
            height: joi_1.default.number().required(),
            birthday: joi_1.default.date().required(),
            origin: joi_1.default.string().required().trim(),
            description: joi_1.default.string().required().trim(),
            type: joi_1.default.object()
                .keys({
                id: joi_1.default.number().required(),
            })
                .required(),
        })
            .required(),
    }),
    petUpdate: joi_1.default.object().keys({
        update: joi_1.default.object().keys({
            id: joi_1.default.number().required(),
            name: joi_1.default.string().required().trim(),
            sku: joi_1.default.string().required(),
            stock_quantity: joi_1.default.number().required(),
            price: joi_1.default.number().required(),
            thumbnail_image: joi_1.default.string().required(),
            description_images: joi_1.default.array().items(joi_1.default.string().trim()).required(),
            age: joi_1.default.number().required(),
            isMale: joi_1.default.boolean().required(),
            color: joi_1.default.string().required(),
            weight: joi_1.default.number().required(),
            height: joi_1.default.number().required(),
            birthday: joi_1.default.date().required(),
            origin: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            type: joi_1.default.object()
                .keys({
                id: joi_1.default.number().required(),
            })
                .allow(),
        }),
    }),
};
