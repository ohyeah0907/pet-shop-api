import Joi from "joi";

export default {
  cartItemCreate: Joi.object().keys({
    create: Joi.object()
      .keys({
        cart: Joi.object()
          .keys({
            id: Joi.number().required(),
          })
          .required(),
        pet: Joi.object()
          .keys({
            id: Joi.number().allow(null),
          })
          .required(),
        accessory: Joi.object()
          .keys({
            id: Joi.number().allow(null),
          })
          .required(),
        quantity: Joi.number().required(),
        total_price: Joi.number().required(),
      })
      .required(),
  }),
  cartItemUpdate: Joi.object().keys({
    update: Joi.object()
      .keys({
        id: Joi.number().required(),
        cart: Joi.object()
          .keys({
            id: Joi.number().required(),
          })
          .required(),
        pet: Joi.object()
          .keys({
            id: Joi.number().allow(null),
          })
          .required(),
        accessory: Joi.object()
          .keys({
            id: Joi.number().allow(null),
          })
          .required(),
        quantity: Joi.number().required(),
        total_price: Joi.number().required(),
      })
      .required(),
  }),
};
