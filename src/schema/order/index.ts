import { OrderStatus, Payment } from "@prisma/client";
import Joi from "joi";

export default {
  orderCreate: Joi.object().keys({
    create: Joi.object()
      .keys({
        user: Joi.object()
          .keys({
            id: Joi.number().required(),
          })
          .required(),
        code: Joi.string().required(),
        order_status: Joi.string()
          .valid(...Object.values(OrderStatus))
          .required(),
        payment: Joi.string()
          .valid(...Object.values(Payment))
          .required(),
      })
      .required(),
  }),
  orderUpdate: Joi.object().keys({
    update: Joi.object()
      .keys({
        id: Joi.number().required(),
        user: Joi.object()
          .keys({
            id: Joi.number().required(),
          })
          .required(),
        order_status: Joi.string()
          .valid(...Object.values(OrderStatus))
          .required(),
        payment: Joi.string()
          .valid(...Object.values(Payment))
          .required(),
      })
      .required(),
  }),
};
