import Joi from "joi";

export default {
  accessoryCreate: Joi.object().keys({
    create: Joi.object()
      .keys({
        name: Joi.string().required().trim(),
        stock_quantity: Joi.number().required(),
        price: Joi.number().required(),
        thumbnail_image: Joi.string().required().trim(),
        description_images: Joi.string().required().trim(),
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
      name: Joi.string().allow(null),
      stock_quantity: Joi.number().allow(null),
      price: Joi.number().allow(null),
      thumbnail_image: Joi.string().allow(null),
      description_images: Joi.string().allow(null),
      origin: Joi.string().allow(null),
      description: Joi.string().allow(null),
      type: Joi.object()
        .keys({
          id: Joi.number().required(),
        })
        .allow(),
    }),
  }),
};
