import Joi from "joi";

export default {
    roomDeviceCreate: Joi.object().keys({
        create: Joi.object().keys({
            is_favorite: Joi.boolean().required(),
            ordering: Joi.number().required(),
            room: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            device: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
        }).required(),

    }),
    roomDeviceUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            room: Joi.object().keys({
                id: Joi.number().required(),
            }),
            device: Joi.object().keys({
                id: Joi.number().required(),
            }),
            is_favorite: Joi.boolean().allow(null),
            ordering: Joi.number().allow(null),
        }),
    }),
}