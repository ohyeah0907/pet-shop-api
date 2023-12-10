"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
var validator_1 = require("../../middleware/validator");
exports.default = {
    userLogin: joi_1.default.object().keys({
        login: joi_1.default.object().keys({
            email: joi_1.default.string().required().trim(),
            password: joi_1.default.string().required().trim(),
        }).required(),
    }),
    userRegister: joi_1.default.object().keys({
        register: joi_1.default.object().keys({
            email: joi_1.default.string().required().trim(),
            password: joi_1.default.string().required().trim(),
        }).required(),
    }),
    userResend: joi_1.default.object().keys({
        resend: joi_1.default.object().keys({
            email: joi_1.default.string().required().trim(),
        }).required(),
    }),
    apiKey: joi_1.default.object()
        .keys((_a = {},
        _a["x-api-key" /* Header.API_KEY */] = joi_1.default.string().required(),
        _a))
        .unknown(true),
    auth: joi_1.default.object()
        .keys({
        authorization: (0, validator_1.JoiAuthBearer)().required(),
    })
        .unknown(true),
    refreshToken: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required().trim(),
    }),
};
