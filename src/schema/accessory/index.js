"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
exports.default = {
    accessoryCreate: joi_1.default.object().keys({
        create: joi_1.default.object()
            .keys({
            sku: joi_1.default.string().required().trim(),
            name: joi_1.default.string().required().trim(),
            stock_quantity: joi_1.default.number().required(),
            price: joi_1.default.number().required(),
            thumbnail_image: joi_1.default.string().required().trim(),
            description_images: joi_1.default.array().items(joi_1.default.string().trim()).required(),
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
    accessoryUpdate: joi_1.default.object().keys({
        update: joi_1.default.object().keys({
            id: joi_1.default.number().required(),
            sku: joi_1.default.string().required().trim(),
            name: joi_1.default.string().required().trim(),
            stock_quantity: joi_1.default.number().required(),
            price: joi_1.default.number().required(),
            thumbnail_image: joi_1.default.string().required(),
            description_images: joi_1.default.array().items(joi_1.default.string().trim()).required(),
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
