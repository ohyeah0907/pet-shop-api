import Joi from "joi";

export default {
  accessoryCreate: Joi.object().keys({
    create: Joi.object()
      .keys({
        sku: Joi.string().required().trim(),
        name: Joi.string().required().trim(),
        stock_quantity: Joi.number().required(),
        price: Joi.number().required(),
        thumbnail_image: Joi.string().required().trim(),
        description_images: Joi.array().items(Joi.string().trim()).required(),
        weight: Joi.number().required(),
        origin: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        type: Joi.object()
          .keys({
            id: Joi.number().required(),
          })
          .required(),
      })
      .required(),
  }),
  accessoryUpdate: Joi.object().keys({
    update: Joi.object().keys({
      id: Joi.number().required(),
      sku: Joi.string().required().trim(),
      name: Joi.string().required().trim(),
      stock_quantity: Joi.number().required(),
      price: Joi.number().required(),
      thumbnail_image: Joi.string().required(),
      description_images: Joi.array().items(Joi.string().trim()).required(),
      origin: Joi.string().required(),
      description: Joi.string().required(),
      weight: Joi.number().required(),
      type: Joi.object()
        .keys({
          id: Joi.number().required(),
        })
        .allow(),
    }),
  }),
};
