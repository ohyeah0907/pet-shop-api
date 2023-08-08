import Joi from "joi";

export default {
    roomCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            // parent: Joi.object().keys({
            //     id: Joi.number().allow(null),
            // }).allow(null),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            image_url: Joi.string().allow(null),
            ordering: Joi.number().allow(null),
        }).required(),

    }),
    roomUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }),
            // parent: Joi.object().keys({
            //     id: Joi.number().allow(null),
            // }).allow(null),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }),
            image_url: Joi.string().allow(null),
            ordering: Joi.number().allow(null),
        }),
    }),
}