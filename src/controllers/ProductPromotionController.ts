import { Request, Response } from "express";
import productPromotionService from "../services/ProductPromotionService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
  getSearch: async (req: Request, res: Response) => {
    const productPromotions = await productPromotionService.getSearch(
      req.body?.search,
    );
    return new SuccessResponse("Thành công!", productPromotions).send(res);
  },
  getById: async (req: Request, res: Response) => {
    try {
      const productPromotion = await productPromotionService.getById(
        parseInt(req.params.id),
      );
      return new SuccessResponse("Thành công!", productPromotion).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const productPromotion = await productPromotionService.create(
        req.body.create,
      );
      return new SuccessResponse("Thành công!", productPromotion).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const productPromotion = await productPromotionService.update(
        req.body.update,
      );
      return new SuccessResponse("Thành công!", productPromotion).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const result = await productPromotionService.delete(
        parseInt(req.params.id),
      );
      return new SuccessResponse("Thành công!", result).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
};

export default controller;
