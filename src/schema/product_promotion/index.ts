import Joi from "joi";

export default {
  productPromotionCreate: Joi.object().keys({
    create: Joi.object()
      .keys({
        pet: Joi.object().keys({
          id: Joi.number().allow(null),
        }),
        accessory: Joi.object().keys({
          id: Joi.number().allow(null),
        }),
        promotion: Joi.object().keys({
          id: Joi.number().required(),
        }),
      })
      .required(),
  }),
  productPromotionUpdate: Joi.object().keys({
    update: Joi.object()
      .keys({
        id: Joi.number().required(),
        pet: Joi.object().keys({
          id: Joi.number().allow(null),
        }),
        accessory: Joi.object().keys({
          id: Joi.number().allow(null),
        }),
        promotion: Joi.object().keys({
          id: Joi.number().required(),
        }),
      })
      .or("pet.id", "accessory.id")
      .required(),
  }),
};
