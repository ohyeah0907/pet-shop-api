import Joi from "joi";

export default {
    tagCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
        }).required(),

    }),
    tagUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
        }),
    }),
}