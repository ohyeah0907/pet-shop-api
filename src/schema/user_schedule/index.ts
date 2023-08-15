import Joi from "joi";

export default {
    userScheduleCreate: Joi.object().keys({
        create: Joi.object().keys({
            user_home: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            started_at: Joi.date().required(),
            ended_at: Joi.date().required(),
        }).required(),

    }),
    userScheduleUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            user_home: Joi.object().keys({
                id: Joi.number().required(),
            }),
            started_at: Joi.date().allow(null),
            ended_at: Joi.date().allow(null),
        }),
    }),
}