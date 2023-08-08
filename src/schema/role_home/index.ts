import Joi from "joi";

export default {
    roleHomeCreate: Joi.object().keys({
        create: Joi.object().keys({
            role: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
        }).required(),

    }),
    roleHomeUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            role: Joi.object().keys({
                id: Joi.number().required(),
            }),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }),
        }),
    }),
}