import Joi from "joi";

export default {
  producFeedbackCreate: Joi.object().keys({
    create: Joi.object()
      .keys({
        pet: Joi.object().keys({
          id: Joi.number().allow(null),
        }),
        accessory: Joi.object().keys({
          id: Joi.number().allow(null),
        }),
        user: Joi.object().keys({
          id: Joi.number().required(),
        }),
        content: Joi.string().required().trim(),
        rating: Joi.number().required(),
      })
      .required(),
  }),
  productFeedbackUpdate: Joi.object().keys({
    update: Joi.object()
      .keys({
        id: Joi.number().required(),
        pet: Joi.object().keys({
          id: Joi.number().allow(null),
        }),
        accessory: Joi.object().keys({
          id: Joi.number().allow(null),
        }),
        user: Joi.object().keys({
          id: Joi.number().required(),
        }),
        content: Joi.string().required().trim(),
        rating: Joi.number().required(),
      })
      .or("pet.id", "accessory.id")
      .required(),
  }),
};
