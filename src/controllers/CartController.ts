import { Request, Response } from "express";
import cartService from "../services/CartService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
  getSearch: async (req: Request, res: Response) => {
    const carts = await cartService.getSearch(req.body?.search);
    return new SuccessResponse("Thành công!", carts).send(res);
  },
  getById: async (req: Request, res: Response) => {
    try {
      const cart = await cartService.getById(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", cart).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const cart = await cartService.create(req.body.create);
      return new SuccessResponse("Thành công!", cart).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const cart = await cartService.update(req.body.update);
      return new SuccessResponse("Thành công!", cart).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const result = await cartService.delete(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", result).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
};

export default controller;
