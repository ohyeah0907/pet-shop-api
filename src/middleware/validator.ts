import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { BadRequest } from "../handler/app-error";
import { BadRequestResponse } from "../handler/app-response";

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

export const JoiUrlEndpoint = () =>
  Joi.string().custom((value: string, helpers) => {
    if (value.includes("://")) return helpers.error("any.invalid");
    return value;
  }, "Url Endpoint Validation");

export const JoiAuthBearer = () =>
  Joi.string().custom((value: string, helpers) => {
    if (!value.startsWith("Bearer ")) return helpers.error("any.invalid");
    if (!value.split(" ")[1]) return helpers.error("any.invalid");
    return value;
  }, "Authorization Header Validation");

export default (
    schema: Joi.AnySchema,
    source: ValidationSource = ValidationSource.BODY,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log("req[source] :>> ", req[source]);
      const { error } = schema.validate(req[source]);

      if (!error) return next();

      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");
      next(new BadRequestResponse(message).send(res));
    } catch (error) {
      next(error);
    }
  };
