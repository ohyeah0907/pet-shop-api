import Joi from "joi";

export default {
    roomCameraCreate: Joi.object().keys({
        create: Joi.object().keys({
            room: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            camera: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            ordering: Joi.number().allow(null),
            pinned: Joi.boolean().allow(null),
        }).required(),

    }),
    roomCameraUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            room: Joi.object().keys({
                id: Joi.number().required(),
            }),
            camera: Joi.object().keys({
                id: Joi.number().required(),
            }),
            ordering: Joi.number().allow(null),
            pinned: Joi.boolean().allow(null),
        }),
    }),
}