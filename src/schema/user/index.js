"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
exports.default = {
    userCreate: joi_1.default.object().keys({
        create: joi_1.default.object().keys({
            name: joi_1.default.string().required().trim(),
            phone: joi_1.default.string().required().trim(),
            email: joi_1.default.string().email().required().trim(),
            username: joi_1.default.string().required().trim(),
            password: joi_1.default.string().required().trim(),
        }).required(),
    }),
    userUpdate: joi_1.default.object().keys({
        update: joi_1.default.object().keys({
            id: joi_1.default.number().required(),
            name: joi_1.default.string().allow(null),
            phone: joi_1.default.string().allow(null),
            email: joi_1.default.string().email().allow(null),
            username: joi_1.default.string().allow(null),
            password: joi_1.default.string().allow(null),
            is_voice: joi_1.default.boolean().allow(null),
            is_admin: joi_1.default.boolean().allow(null),
            is_locked: joi_1.default.boolean().allow(null),
            is_verified: joi_1.default.boolean().allow(null),
        }),
    }),
};
