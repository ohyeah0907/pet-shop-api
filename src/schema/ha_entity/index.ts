import { DeviceType } from "@prisma/client";
import Joi from "joi";

export default {
    haEntityCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            description: Joi.string().required().trim(),
            house: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            entity_id: Joi.string().required().trim(),
            accessed_at: Joi.date().required(),
        }).required(),

    }),
    haEntityUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            description: Joi.string().allow(null),
            house: Joi.object().keys({
                id: Joi.number().required(),
            }).allow(null),
            entity_id: Joi.string().allow(null),
            accessed_at: Joi.date().allow(null),
        }),
    }),
}