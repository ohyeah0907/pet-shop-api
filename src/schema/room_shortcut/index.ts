import Joi from "joi";

export default {
    roomShortcutCreate: Joi.object().keys({
        create: Joi.object().keys({
            room: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            room_other: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            longitude: Joi.number().allow(null),
            latitude: Joi.number().allow(null),
        }).required(),

    }),
    roomShortcutUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            room: Joi.object().keys({
                id: Joi.number().required(),
            }),
            room_other: Joi.object().keys({
                id: Joi.number().required(),
            }),
            longitude: Joi.number().allow(null),
            latitude: Joi.number().allow(null),
        }),
    }),
}