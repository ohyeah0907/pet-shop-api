import Joi from "joi";

export default {
    userHouseCreate: Joi.object().keys({
        create: Joi.object().keys({
            role_house: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            ha_username: Joi.string().required(),
            ha_password: Joi.string().required(),
            ordering: Joi.number().allow(null),
        }).required(),

    }),
    userHouseUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            role_house: Joi.object().keys({
                id: Joi.number().required(),
            }),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }),
            ha_username: Joi.string().allow(null),
            ha_password: Joi.string().allow(null),
            ordering: Joi.number().allow(null),
        }),
    }),
}