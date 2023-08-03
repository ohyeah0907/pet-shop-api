import Joi from "joi";

export default {
    roleDeviceCreate: Joi.object().keys({
        create: Joi.object().keys({
            enabled: Joi.boolean().required(),
            role_house: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            device: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
        }).required(),

    }),
    roleDeviceUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            role_house: Joi.object().keys({
                id: Joi.number().required(),
            }),
            device: Joi.object().keys({
                id: Joi.number().required(),
            }),
            enable: Joi.boolean().allow(null),
        }),
    }),
}