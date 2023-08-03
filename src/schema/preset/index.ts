import Joi from "joi";

export default {
    presetCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            camera: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            url: Joi.string().required().trim(),
        }).required(),

    }),
    presetUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            camera: Joi.object().keys({
                id: Joi.number().required(),
            }),
            url: Joi.string().allow(null).trim(),
        }),
    }),
}