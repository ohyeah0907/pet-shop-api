import Joi from "joi";

export default {
    userNotificationCreate: Joi.object().keys({
        create: Joi.object().keys({
            notification: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            userFCM: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            is_sent: Joi.boolean().required(),
            sent_at: Joi.date().allow(null),
            is_viewed: Joi.boolean().required(),
            viewed_at: Joi.date().allow(null),
        }).required(),

    }),
    userNotificationUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            notification: Joi.object().keys({
                id: Joi.number().required(),
            }),
            userFCM: Joi.object().keys({
                id: Joi.number().required(),
            }),
            is_sent: Joi.boolean().allow(null),
            sent_at: Joi.date().allow(null),
            is_viewed: Joi.boolean().allow(null),
            viewed_at: Joi.date().allow(null),
        }),
    }),
}