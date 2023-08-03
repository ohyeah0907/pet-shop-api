import Joi from "joi";

export default {
    sessionCreate: Joi.object().keys({
        create: Joi.object().keys({
            user: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            token: Joi.string().required(),
            location: Joi.string().required(),
            ip: Joi.string().required(),
            user_agent: Joi.string().required(),
            device: Joi.string().required(),
            platform: Joi.string().required(),
            finger_print: Joi.string().required(),
            expired_at: Joi.date().required(),
            accessed_at: Joi.date().required(),
        }).required(),

    }),
    sessionUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }),
            token: Joi.string().allow(null),
            location: Joi.string().allow(null),
            ip: Joi.string().allow(null),
            user_agent: Joi.string().allow(null),
            device: Joi.string().allow(null),
            platform: Joi.string().allow(null),
            finger_print: Joi.string().allow(null),
            expired_at: Joi.date().allow(null),
            accessed_at: Joi.date().allow(null),
        }),
    }),
}