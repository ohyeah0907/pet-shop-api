import { ActionableType } from "@prisma/client";
import Joi from "joi";

export default {
    actionableCreate: Joi.object().keys({
        create: Joi.object().keys({
            name: Joi.string().required().trim(),
            ordering: Joi.number().required(),
            room: Joi.object().keys({
                id: Joi.number().required(),
            }).required(),
            type: Joi.string().required().valid(...Object.values(ActionableType)),
            type_id: Joi.number().required(),
        }).required(),

    }),
    actionableUpdate: Joi.object().keys({
        update: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().allow(null),
            ordering: Joi.number().allow(null),
            room: Joi.object().keys({
                id: Joi.number().required(),
            }),
            type: Joi.string().allow(null).valid(...Object.values(ActionableType)),
            type_id: Joi.number().allow(null),
        }),
    }),
}