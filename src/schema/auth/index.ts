import Joi from "joi";
import { Header } from '../../enum';
import { JoiAuthBearer } from '../../middleware/validator';

export default {
    userLogin: Joi.object().keys({
        login: Joi.object().keys({
            username: Joi.string().required().trim(),
            password: Joi.string().required().trim(),
        }).required(),
    }),
    apiKey: Joi.object()
        .keys({
            [Header.API_KEY]: Joi.string().required(),
        })
        .unknown(true),
    auth: Joi.object()
        .keys({
            authorization: JoiAuthBearer().required(),
        })
        .unknown(true),
}