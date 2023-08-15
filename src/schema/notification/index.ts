import Joi from "joi";

export default {
    notificationCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            content: Joi.string().required().trim(),
            deep_link: Joi.string().required().trim(),
            data: Joi.string().required().trim(),
            has_media: Joi.boolean().required(),
        }).required(),

    }),
    notificationUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            content: Joi.string().allow(null).trim(),
            deep_link: Joi.string().allow(null).trim(),
            data: Joi.string().allow(null).trim(),
            has_media: Joi.boolean().allow(null),
        }),
    }),
}