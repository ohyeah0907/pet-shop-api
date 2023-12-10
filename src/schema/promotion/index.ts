import Joi from "joi";

export default {
  promotionCreate: Joi.object().keys({
    create: Joi.object()
      .keys({
        name: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
      })
      .required(),
  }),
  promotionUpdate: Joi.object().keys({
    update: Joi.object()
      .keys({
        id: Joi.number().required(),
        name: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
      })
      .required(),
  }),
};
