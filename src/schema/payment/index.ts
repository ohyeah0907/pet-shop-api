import Joi from "joi";
import { Header } from "../../enum";
import { JoiAuthBearer } from "../../middleware/validator";

export default {
  payment: Joi.object().keys({
    checkout: Joi.object()
      .keys({
        items: Joi.array()
          .items(
            Joi.object().keys({
              pet_id: Joi.number().allow(null),
              accessory_id: Joi.number().allow(null),
              quantity: Joi.number().required(),
            }),
          )
          .required(),
      })
      .required(),
  }),
};
