import { Request, Response } from "express";
import productFeedbackService from "../services/ProductFeedbackService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
  getSearch: async (req: Request, res: Response) => {
    const productFeedbacks = await productFeedbackService.getSearch(
      req.body?.search,
    );
    return new SuccessResponse("Thành công!", productFeedbacks).send(res);
  },
  getById: async (req: Request, res: Response) => {
    try {
      const productFeedback = await productFeedbackService.getById(
        parseInt(req.params.id),
      );
      return new SuccessResponse("Thành công!", productFeedback).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const productFeedback = await productFeedbackService.create(
        req.body.create,
      );
      return new SuccessResponse("Thành công!", productFeedback).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const productFeedback = await productFeedbackService.update(
        req.body.update,
      );
      return new SuccessResponse("Thành công!", productFeedback).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const result = await productFeedbackService.delete(
        parseInt(req.params.id),
      );
      return new SuccessResponse("Thành công!", result).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
};

export default controller;
