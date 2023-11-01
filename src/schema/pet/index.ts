import Joi from "joi";

export default {
    petCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            stock_quantity: Joi.number().required(),
            price: Joi.number().required(),
            thumbnail_image: Joi.string().required().trim(),
            description_images: Joi.string().required().trim(),
            age: Joi.number().required(),
            isMale: Joi.boolean().required(),
            color: Joi.string().required().trim(),
            weight: Joi.number().required(),
            height: Joi.number().required(),
            birth_date: Joi.date().required(),
            origin: Joi.string().required().trim(),
            description: Joi.string().required().trim(),
            type: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
        }).required(),
    }),
    petUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            stock_quantity: Joi.number().allow(null),
            price: Joi.number().allow(null),
            thumbnail_image: Joi.string().allow(null),
            description_images: Joi.string().allow(null),
            age: Joi.number().allow(null),
            isMale: Joi.boolean().allow(null),
            color: Joi.string().allow(null),
            weight: Joi.number().allow(null),
            height: Joi.number().allow(null),
            birth_date: Joi.date().allow(null),
            origin: Joi.string().allow(null),
            description: Joi.string().allow(null),
            type: Joi.object().keys({
                id: Joi.number().required(),
            }).allow(),
        })
    }),
}