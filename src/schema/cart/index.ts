import Joi from "joi";

export default {
  cartCreate: Joi.object().keys({
    create: Joi.object()
      .keys({
        user: Joi.object()
          .keys({
            id: Joi.number().required(),
          })
          .required(),
        total_quantity: Joi.number().required(),
        total_price: Joi.number().required(),
      })
      .required(),
  }),
  cartUpdate: Joi.object().keys({
    update: Joi.object()
      .keys({
        id: Joi.number().required(),
        user: Joi.object()
          .keys({
            id: Joi.number().required(),
          })
          .required(),
        total_quantity: Joi.number().required(),
        total_price: Joi.number().required(),
      })
      .required(),
  }),
};
