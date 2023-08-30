import { DeviceType } from "@prisma/client";
import Joi from "joi";

export default {
    voiceProjectCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            project_id: Joi.string().required().trim(),
            redirect_uris: Joi.array().items(Joi.string()).required(),
        }).required(),

    }),
    voiceProjectUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().required().trim(),
            project_id: Joi.string().required().trim(),
            redirect_uris: Joi.array().items(Joi.string()).required(),
        }),
    }),
}