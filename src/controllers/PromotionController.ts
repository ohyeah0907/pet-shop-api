import { Request, Response } from "express";
import promotionService from "../services/PromotionService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
  getSearch: async (req: Request, res: Response) => {
    const promotions = await promotionService.getSearch(req.body?.search);
    return new SuccessResponse("Thành công!", promotions).send(res);
  },
  getById: async (req: Request, res: Response) => {
    try {
      const promotion = await promotionService.getById(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", promotion).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const promotion = await promotionService.create(req.body.create);
      return new SuccessResponse("Thành công!", promotion).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const promotion = await promotionService.update(req.body.update);
      return new SuccessResponse("Thành công!", promotion).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const result = await promotionService.delete(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", result).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
};

export default controller;
