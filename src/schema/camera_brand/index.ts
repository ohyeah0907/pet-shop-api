import Joi from "joi";

export default {
    cameraBrandCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            preset_pattern: Joi.string().required().trim(),
            url_pattern: Joi.string().required().trim(),
        }).required(),

    }),
    cameraBrandUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            preset_pattern: Joi.string().allow(null).trim(),
            url_pattern: Joi.string().allow(null).trim(),
        }),
    }),
}