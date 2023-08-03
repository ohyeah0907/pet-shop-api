import { exec } from "child_process";
import { NextFunction, Request, Response } from "express";

type AsyncHandler = (
  req: any,
  res: Response,
  next: NextFunction
) => Promise<any>;

export default (execution: AsyncHandler) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return execution(req, res, next).catch(next);
}
