import { Request, Response } from "express";
import cartItemService from "../services/CartItemService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
  getSearch: async (req: Request, res: Response) => {
    const cartItems = await cartItemService.getSearch(req.body?.search);
    return new SuccessResponse("Thành công!", cartItems).send(res);
  },
  getById: async (req: Request, res: Response) => {
    try {
      const cartItem = await cartItemService.getById(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", cartItem).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const cartItem = await cartItemService.create(req.body.create);
      return new SuccessResponse("Thành công!", cartItem).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const cartItem = await cartItemService.update(req.body.update);
      return new SuccessResponse("Thành công!", cartItem).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const result = await cartItemService.delete(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", result).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
};

export default controller;
