import { DeviceType } from "@prisma/client";
import Joi from "joi";

export default {
    voiceSessionCreate: Joi.object().keys({
        create: Joi.object().keys({
            user: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            voice_project: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            access_token:Joi.string().required(),
            refresh_token:Joi.string().required(),
            expired_at: Joi.date().required(),
        }).required(),

    }),
    voiceSessionUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            user: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            voice_project: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            access_token:Joi.string().required(),
            refresh_token:Joi.string().required(),
            expired_at: Joi.date().required(),
        }),
    }),
}