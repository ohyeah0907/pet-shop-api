import Joi from "joi";

export default {
    roomDeviceCreate: Joi.object().keys({
        create: Joi.object().keys({
            room: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            device: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            longitude: Joi.number().required(),
            latitude: Joi.number().required(),
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
            ordering: Joi.number().allow(null),
            longitude: Joi.number().allow(null),
            latitude: Joi.number().allow(null),
        }),
    }),
}