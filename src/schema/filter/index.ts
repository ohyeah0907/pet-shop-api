import { DeviceType } from "@prisma/client";
import Joi from "joi";

export default {
    filterCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            device_type: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
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
            device_type: Joi.object().keys({
                id: Joi.number().required(),
            }),
            icon: Joi.string().allow(null),
            background_on: Joi.string().allow(null),
            background_off: Joi.string().allow(null),
            color_on: Joi.string().allow(null),
            color_off: Joi.string().allow(null),
        }),
    }),
}