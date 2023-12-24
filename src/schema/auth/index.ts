import Joi from "joi";
import { Header } from "../../enum";
import { JoiAuthBearer } from "../../middleware/validator";

export default {
  userLogin: Joi.object().keys({
    login: Joi.object()
      .keys({
        email: Joi.string().required().trim(),
        password: Joi.string().required().trim(),
      })
      .required(),
  }),
  userRegister: Joi.object().keys({
    register: Joi.object()
      .keys({
        email: Joi.string().required().trim(),
        password: Joi.string().required().trim(),
        address: Joi.string().required().trim(),
        phone: Joi.string().required().trim(),
      })
      .required(),
  }),
  userResend: Joi.object().keys({
    resend: Joi.object()
      .keys({
        email: Joi.string().required().trim(),
      })
      .required(),
  }),
  apiKey: Joi.object()
    .keys({
      [Header.API_KEY]: Joi.string().required(),
    })
    .unknown(true),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().trim(),
  }),
};
