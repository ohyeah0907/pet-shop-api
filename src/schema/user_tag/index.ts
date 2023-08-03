import Joi from "joi";

export default {
    userTagCreate: Joi.object().keys({
        create: Joi.object().keys({
            tag: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
        }).required(),

    }),
    userTagUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            tag: Joi.object().keys({
                id: Joi.number().required(),
            }),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }),
        }),
    }),
}