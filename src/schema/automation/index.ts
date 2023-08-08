import Joi from "joi";

export default {
    automationCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            entity_id: Joi.string().required(),
            description: Joi.string().required().trim(),
            accesssed_at: Joi.date().required(),
        }).required(),

    }),
    automationUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }),
            entity_id: Joi.string().allow(null),
            description: Joi.string().allow(null).trim(),
            accesssed_at: Joi.date().allow(null),
        }),
    }),
}