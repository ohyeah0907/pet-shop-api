import Joi from "joi";

export default {
    houseCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            address: Joi.string().required().trim(),
            lan_ip: Joi.string().required().trim(),
            lan_port: Joi.number().required(),
            wan_domain: Joi.string().required().trim(),
            wan_port: Joi.number().required(),
            username: Joi.string().required().trim(),
            password: Joi.string().required().trim(),
            image_url: Joi.string().required().trim(),
        }).required(),
    }),
    houseUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            address: Joi.string().allow(null),
            lan_ip: Joi.string().allow(null),
            lan_port: Joi.number().allow(null),
            wan_domain: Joi.string().allow(null),
            wan_port: Joi.number().allow(null),
            username: Joi.string().allow(null),
            password: Joi.string().allow(null),
            image_url: Joi.string().allow(null),
            active_house_cloud: Joi.object().keys({
                id: Joi.number().required(),
            }).allow(null),
        })
    })
}