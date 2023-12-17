import express, { Response } from "express";
import { ProtectedRequest } from "../types/app-request";
import userService from "../services/UserService";
import KeystoreRepository from "../repositories/KeyStoreRepository";
import {
  AppError,
  AuthenticationFailure,
  TokenExpired,
} from "../handler/app-error";
import JWT from "../core/jwt";
import { getAccessToken, validateTokenData } from "../helper/token";
import schema from "../schema/auth";
import asyncHandler from "../handler/asyncHandler";
import validator, { ValidationSource } from "./validator";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const router = express.Router();

export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: ProtectedRequest, res: Response, next: any) => {
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase
    try {
      const payload = await JWT.decode(req.accessToken);
      validateTokenData(payload);
      try {
        await JWT.validate(req.accessToken);
      } catch (error) {
        if (error instanceof TokenExpired) {
          const user: any = await userService.getUserById(
            parseInt(payload.sub),
          );
          if (!user)
            throw new AuthenticationFailure("Người dùng chưa được tạo");
          req.user = user;

          return next();
        }
      }
      return new SuccessResponse("Token còn sử dụng được", null).send(res);
    } catch (e: any) {
      return AppError.handle(e, res);
    }
  }),
);
