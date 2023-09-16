import { DeviceType, DeviceTypeCode } from "@prisma/client";
import Joi from "joi";

export default {
    deviceCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            code: Joi.string().required().valid(...Object.values(DeviceTypeCode)),
        }).required(),

    }),
    deviceUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            code: Joi.string().allow(null).valid(...Object.values(DeviceTypeCode)),
        }),
    }),
}