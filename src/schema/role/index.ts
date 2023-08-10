import Joi from "joi";

export default {
    roleCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
        }).required(),

    }),
    roleUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            is_owner: Joi.boolean().allow(null),
        }),
    }),
}