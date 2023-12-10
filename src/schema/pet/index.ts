import Joi from "joi";

export default {
  petCreate: Joi.object().keys({
    create: Joi.object()
      .keys({
        name: Joi.string().required().trim(),
        sku: Joi.string().required().trim(),
        stock_quantity: Joi.number().required(),
        price: Joi.number().required(),
        thumbnail_image: Joi.string().required().trim(),
        description_images: Joi.array().items(Joi.string().trim()).required(),
        age: Joi.number().required(),
        isMale: Joi.boolean().required(),
        color: Joi.string().required().trim(),
        weight: Joi.number().required(),
        height: Joi.number().required(),
        birthday: Joi.date().required(),
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
  petUpdate: Joi.object().keys({
    update: Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().required().trim(),
      sku: Joi.string().required(),
      stock_quantity: Joi.number().required(),
      price: Joi.number().required(),
      thumbnail_image: Joi.string().required(),
      description_images: Joi.array().items(Joi.string().trim()).required(),
      age: Joi.number().required(),
      isMale: Joi.boolean().required(),
      color: Joi.string().required(),
      weight: Joi.number().required(),
      height: Joi.number().required(),
      birthday: Joi.date().required(),
      origin: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.object()
        .keys({
          id: Joi.number().required(),
        })
        .allow(),
    }),
  }),
};
