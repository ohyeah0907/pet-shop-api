import { DeviceType } from "@prisma/client";
import Joi from "joi";

export default {
    userFCMCreate: Joi.object().keys({
        create: Joi.object().keys({
            device_name: Joi.string().required(),
            app_name: Joi.string().required(),
            other_info: Joi.string().required(),
            fcm_subscribe_id: Joi.string().required(),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }),
        }).required(),

    }),
    userFCMUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            device_name: Joi.string().allow(null),
            app_name: Joi.string().allow(null),
            other_info: Joi.string().allow(null),
            fcm_subscribe_id: Joi.string().allow(null),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }).allow(null)
        }),
    }),
}