"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
exports.default = {
    promotionCreate: joi_1.default.object().keys({
        create: joi_1.default.object()
            .keys({
            name: joi_1.default.string().required().trim(),
            description: joi_1.default.string().required().trim(),
            start_date: joi_1.default.date().required(),
            end_date: joi_1.default.date().required(),
        })
            .required(),
    }),
    promotionUpdate: joi_1.default.object().keys({
        update: joi_1.default.object()
            .keys({
            id: joi_1.default.number().required(),
            name: joi_1.default.string().required().trim(),
            description: joi_1.default.string().required().trim(),
            start_date: joi_1.default.date().required(),
            end_date: joi_1.default.date().required(),
        })
            .required(),
    }),
};
