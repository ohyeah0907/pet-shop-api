import { Gender } from "@prisma/client";
import Joi from "joi";

export default {
  userCreate: Joi.object().keys({
    create: Joi.object()
      .keys({
        name: Joi.string().required().trim(),
        phone: Joi.string().required().trim(),
        address: Joi.string().trim().allow(null, ""),
        email: Joi.string().email().required().trim(),
        gender: Joi.string()
          .trim()
          .allow(...Object.values(Gender)),
        username: Joi.string().required().trim(),
        password: Joi.string().required().trim(),
        is_admin: Joi.boolean().required(),
        is_locked: Joi.boolean().required(),
        is_verified: Joi.boolean().required(),
        verification_token: Joi.string().required().trim(),
      })
      .required(),
  }),
  userUpdate: Joi.object().keys({
    update: Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().allow(null, ""),
      phone: Joi.string().allow(null, ""),
      address: Joi.string().trim().allow(null, ""),
      gender: Joi.string()
        .trim()
        .allow(...Object.values(Gender)),
      email: Joi.string().email().allow(null, ""),
      username: Joi.string().allow(null, ""),
      password: Joi.string().allow(null),
      is_admin: Joi.boolean().allow(null),
      is_locked: Joi.boolean().allow(null),
      is_verified: Joi.boolean().allow(null),
      verification_token: Joi.string().allow(null, ""),
    }),
  }),
};
