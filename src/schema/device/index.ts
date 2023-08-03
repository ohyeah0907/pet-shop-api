import { DeviceType } from "@prisma/client";
import Joi from "joi";

export default {
    deviceCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            house: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            entity_id: Joi.string().required(),
            sub_type: Joi.string().required(),
            type: Joi.string().required().valid(...Object.values(DeviceType)),
            status: Joi.boolean().required(),
            attributes: Joi.string().required(),
            preset: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            description: Joi.string().required().trim(),
        }).required(),

    }),
    deviceUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            house: Joi.object().keys({
                id: Joi.number().required(),
            }),
            entity_id: Joi.string().allow(null),
            sub_type: Joi.string().allow(null),
            type: Joi.string().allow(null).valid(...Object.values(DeviceType)),
            status: Joi.boolean().allow(null),
            attributes: Joi.string().allow(null),
            preset: Joi.object().keys({
                id: Joi.number().required(),
            }).allow(null),
            description: Joi.string().allow(null).trim(),
        }),
    }),
}