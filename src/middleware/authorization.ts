import express, { NextFunction, Response } from 'express';
import { ProtectedRequest } from '../types/app-request';
import { AuthenticationFailure } from '../handler/app-error';
// import { RoleRepository } from '../database/repository/role';
import asyncHandler from '../handler/asyncHandler';

const router = express.Router();

export default router.use(
  asyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.is_admin)
      throw new AuthenticationFailure('Bạn không có quyền truy cập vào tài nguyên này');

    // if (!authorized) throw new AuthenticationFailure('Permission denied');

    return next();
  }),
);