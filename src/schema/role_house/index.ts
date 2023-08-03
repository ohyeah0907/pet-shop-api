import Joi from "joi";

export default {
    roleHouseCreate: Joi.object().keys({
        create: Joi.object().keys({
            role: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            house: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
        }).required(),

    }),
    roleHouseUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            role: Joi.object().keys({
                id: Joi.number().required(),
            }),
            house: Joi.object().keys({
                id: Joi.number().required(),
            }),
        }),
    }),
}