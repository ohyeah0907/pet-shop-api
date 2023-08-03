import { DeviceType } from "@prisma/client";
import Joi from "joi";

export default {
    filterCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            devicetype: Joi.string().required().valid(...Object.values(DeviceType)),
            icon: Joi.string().required().trim(),
            background_on: Joi.string().required().trim(),
            background_off: Joi.string().required().trim(),
            color_on: Joi.string().required().trim(),
            color_off: Joi.string().required().trim(),
        }).required(),

    }),
    filterUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            devicetype: Joi.string().allow(null).valid(...Object.values(DeviceType)),
            icon: Joi.string().allow(null),
            background_on: Joi.string().allow(null),
            background_off: Joi.string().allow(null),
            color_on: Joi.string().allow(null),
            color_off: Joi.string().allow(null),
        }),
    }),
}