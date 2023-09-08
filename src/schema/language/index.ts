import Joi from "joi";

export default {
    languageCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            code: Joi.string().required().trim(),
        }).required(),

    }),
    languageUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            code: Joi.string().allow(null),
        }),
    }),
}