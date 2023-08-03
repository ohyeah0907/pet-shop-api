import Joi from "joi";

export default {
    scheduleWeekCreate: Joi.object().keys({
        create: Joi.object().keys({
            schedule: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            week_day: Joi.number().required(),
            enable: Joi.boolean().required(),
        }).required(),

    }),
    scheduleWeekUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            schedule: Joi.object().keys({
                id: Joi.number().required(),
            }),
            week_day: Joi.number().allow(null),
            enable: Joi.boolean().allow(null),
        }),
    }),
}