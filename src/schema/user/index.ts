import Joi from "joi";

export default {
    userCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            phone: Joi.string().required().trim(),
            email: Joi.string().email().required().trim(),
            role: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            username: Joi.string().required().trim(),
            password: Joi.string().required().trim(),
            is_voice: Joi.boolean().required(),
        }).required(),

    }),
    userUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            phone: Joi.string().allow(null),
            email: Joi.string().email().allow(null),
            role: Joi.object().keys({
                id: Joi.number().required(),
            }),
            username: Joi.string().allow(null),
            password: Joi.string().allow(null),
            is_voice: Joi.boolean().allow(null),
        }),
    }),
}