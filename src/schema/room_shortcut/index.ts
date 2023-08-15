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
            longtitude: Joi.bigint().allow(null),
            latitude: Joi.bigint().allow(null),
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
            longtitude: Joi.bigint().allow(null),
            latitude: Joi.bigint().allow(null),
        }),
    }),
}