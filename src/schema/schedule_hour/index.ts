import Joi from "joi";

export default {
    scheduleHourCreate: Joi.object().keys({
        create: Joi.object().keys({
            schedule: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            started_hour: Joi.number().required(),
            ended_hour: Joi.number().required(),
        }).required(),

    }),
    scheduleHourUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            schedule: Joi.object().keys({
                id: Joi.number().required(),
            }),
            started_hour: Joi.number().allow(null),
            ended_hour: Joi.number().allow(null),
        }),
    }),
}