import Joi from "joi";

export default {
  accessoryTypeCreate: Joi.object().keys({
    create: Joi.object()
      .keys({
        name: Joi.string().required().trim(),
        parent: Joi.object()
          .keys({
            id: Joi.number().allow(null),
          })
          .required(),
      })
      .required(),
  }),
  accessoryTypeUpdate: Joi.object().keys({
    update: Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().required().trim(),
      parent: Joi.object()
        .keys({
          id: Joi.number().allow(null),
        })
        .required(),
    }),
  }),
};
