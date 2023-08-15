import Joi from "joi";

export default {
    roomCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            thumb_image: Joi.string().required(),
            panorama_image: Joi.string().required(),
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
            user: Joi.object().keys({
                id: Joi.number().required(),
            }),
            thumb_image: Joi.string().allow(null),
            panorama_image: Joi.string().allow(null),
            is_home: Joi.boolean().allow(null),
            ordering: Joi.number().allow(null),
        }),
    }),
}