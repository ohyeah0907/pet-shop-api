"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
exports.default = {
    accessoryTypeCreate: joi_1.default.object().keys({
        create: joi_1.default.object()
            .keys({
            name: joi_1.default.string().required().trim(),
            parent: joi_1.default.object()
                .keys({
                id: joi_1.default.number().allow(null),
            })
                .required(),
        })
            .required(),
    }),
    accessoryTypeUpdate: joi_1.default.object().keys({
        update: joi_1.default.object().keys({
            id: joi_1.default.number().required(),
            name: joi_1.default.string().required().trim(),
            parent: joi_1.default.object()
                .keys({
                id: joi_1.default.number().allow(null),
            })
                .required(),
        }),
    }),
};
