import Joi from "joi";

export default {
    userHomeCreate: Joi.object().keys({
        create: Joi.object().keys({
            home: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            ha_username: Joi.string().required(),
            ha_password: Joi.string().required(),
        }).required(),

    }),
    userHomeUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }),
            ha_username: Joi.string().allow(null),
            ha_password: Joi.string().allow(null),
            ordering: Joi.number().allow(null),
            lan_only: Joi.boolean().allow(null),
            is_owner: Joi.boolean().allow(null),
        }),
    }),
}