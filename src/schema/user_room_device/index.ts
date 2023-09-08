import Joi from "joi";

export default {
    userRoomDeviceCreate: Joi.object().keys({
        create: Joi.object().keys({
            user: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            room_device: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            enable: Joi.boolean().required(),
        }).required(),

    }),
    userRoomDeviceUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }),
            room_device: Joi.object().keys({
                id: Joi.number().required(),
            }),
            enable: Joi.boolean().allow(null),
        }),
    }),
}