"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
exports.default = {
    cartCreate: joi_1.default.object().keys({
        create: joi_1.default.object()
            .keys({
            user: joi_1.default.object()
                .keys({
                id: joi_1.default.number().required(),
            })
                .required(),
            total_quantity: joi_1.default.number().required(),
            total_price: joi_1.default.number().required(),
        })
            .required(),
    }),
    cartUpdate: joi_1.default.object().keys({
        update: joi_1.default.object()
            .keys({
            id: joi_1.default.number().required(),
            user: joi_1.default.object()
                .keys({
                id: joi_1.default.number().required(),
            })
                .required(),
            total_quantity: joi_1.default.number().required(),
            total_price: joi_1.default.number().required(),
        })
            .required(),
    }),
};
