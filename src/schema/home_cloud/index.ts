import Joi from "joi";

export default {
    homeCloudCreate: Joi.object().keys({
        create: Joi.object().keys({
            home: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            cloud: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            cloud_port: Joi.number().required(),
            vpn_ip: Joi.string().required().trim(),
            private_key: Joi.string().required().trim(),
            public_key: Joi.string().required().trim(),
            pre_shared_key: Joi.string().required().trim(),
        }).required(),

    }),
    homeCloudUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            home: Joi.object().keys({
                id: Joi.number().required(),
            }),
            cloud: Joi.object().keys({
                id: Joi.number().required(),
            }),
            vpn_ip: Joi.string().allow(null),
            private_key: Joi.string().allow(null),
            public_key: Joi.string().allow(null),
            pre_shared_key: Joi.string().allow(null),
        }),
    }),
}