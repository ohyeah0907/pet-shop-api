import Joi from "joi";

export default {
    roleCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            is_admin: Joi.boolean().required(),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
        }).required(),

    }),
    roleUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }),
            name: Joi.string().allow(null),
            is_admin: Joi.boolean().allow(null),
        }),
    }),
}