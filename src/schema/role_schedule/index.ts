import Joi from "joi";

export default {
    roleScheduleCreate: Joi.object().keys({
        create: Joi.object().keys({
            role_home: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            started_at: Joi.date().required(),
            ended_at: Joi.date().required(),
        }).required(),

    }),
    roleScheduleUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            role_home: Joi.object().keys({
                id: Joi.number().required(),
            }),
            started_at: Joi.date().allow(null),
            ended_at: Joi.date().allow(null),
        }),
    }),
}