import Joi from "joi";

export default {
    cloudCreate: Joi.object().keys({
        create: Joi.object().keys({
            ip: Joi.string().required().trim(),
            domain: Joi.string().required().trim(),
        }).required(),

    }),
    cloudUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            ip: Joi.string().allow(null),
            domain: Joi.string().allow(null),
        }),
    }),
}