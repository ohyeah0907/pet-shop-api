import Joi from "joi";

export default {
    sensorCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            entity_id: Joi.string().required(),
        }).required(),

    }),
    sensorUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }),
            entity_id: Joi.string().allow(null),
        }),
    }),
}