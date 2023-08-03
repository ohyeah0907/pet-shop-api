import Joi from "joi";

export default {
    cameraCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            house: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            username: Joi.string().required().trim(),
            password: Joi.string().required().trim(),
            camera_brand: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            lan_ip: Joi.string().required().trim(),
            lan_port: Joi.number().required(),
            lan_uri: Joi.string().required().trim(),
            wan_ip: Joi.string().required().trim(),
            wan_port: Joi.number().required(),
            wan_uri: Joi.string().required().trim(),
            cloud_domain: Joi.string().required().trim(),
            cloud_uri: Joi.string().required().trim(),
            cloud_port: Joi.number().required(),
        }).required(),

    }),
    cameraUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            house: Joi.object().keys({
                id: Joi.number().required(),
            }),
            username: Joi.string().allow(null),
            password: Joi.string().allow(null),
            camera_brand: Joi.object().keys({
                id: Joi.number().required(),
            }),
            lan_ip: Joi.string().allow(null),
            lan_port: Joi.number().allow(null),
            lan_uri: Joi.string().allow(null),
            wan_ip: Joi.string().allow(null),
            wan_port: Joi.number().allow(null),
            wan_uri: Joi.string().allow(null),
            cloud_domain: Joi.string().allow(null),
            cloud_uri: Joi.string().allow(null),
            cloud_port: Joi.number().allow(null),
        }),
    }),
}