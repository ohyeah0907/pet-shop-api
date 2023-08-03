import Joi from "joi";

export default {
    notificationCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            content: Joi.string().required().trim(),
            deep_link: Joi.string().required().trim(),
        }).required(),

    }),
    notificationUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            content: Joi.string().allow(null).trim(),
            deep_link: Joi.string().allow(null).trim(),
        }),
    }),
}