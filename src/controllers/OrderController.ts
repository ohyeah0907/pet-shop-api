import { Request, Response } from "express";
import orderService from "../services/OrderService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
  getSearch: async (req: Request, res: Response) => {
    const orders = await orderService.getSearch(req.body?.search);
    return new SuccessResponse("Thành công!", orders).send(res);
  },
  getById: async (req: Request, res: Response) => {
    try {
      const order = await orderService.getById(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", order).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const order = await orderService.create(req.body.create);
      return new SuccessResponse("Thành công!", order).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const order = await orderService.update(req.body.update);
      return new SuccessResponse("Thành công!", order).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const result = await orderService.delete(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", result).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
};

export default controller;
