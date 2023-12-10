import { OrderStatus } from "@prisma/client";
import Joi from "joi";

export default {
  orderDetailCreate: Joi.object().keys({
    create: Joi.object()
      .keys({
        order: Joi.object()
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
        price: Joi.number().required(),
      })
      .required(),
  }),
  orderDetailUpdate: Joi.object().keys({
    update: Joi.object()
      .keys({
        id: Joi.number().required(),
        order: Joi.object()
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
        price: Joi.number().required(),
      })
      .required(),
  }),
};
