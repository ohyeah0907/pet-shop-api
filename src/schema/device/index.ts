import Joi from "joi";

export default {
    deviceCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            ha_entity: Joi.object().keys({
                entity_id: Joi.string().required(),
            }).required(),
            sub_type: Joi.string().required(),
            type: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
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
            home: Joi.object().keys({
                id: Joi.number().required(),
            }),
            ha_entity: Joi.object().keys({
                entity_id: Joi.string().allow(null),
            }).allow(null),
            sub_type: Joi.string().allow(null),
            type: Joi.object().keys({
                id: Joi.number().required(),
            }),
            status: Joi.boolean().allow(null),
            attributes: Joi.string().allow(null),
            preset: Joi.object().keys({
                id: Joi.number().required(),
            }).allow(null),
            description: Joi.string().allow(null).trim(),
        }),
    }),
}