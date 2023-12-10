import { Request, Response } from "express";
import orderDetailService from "../services/OrderDetailService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
  getSearch: async (req: Request, res: Response) => {
    const orderDetails = await orderDetailService.getSearch(req.body?.search);
    return new SuccessResponse("Thành công!", orderDetails).send(res);
  },
  getById: async (req: Request, res: Response) => {
    try {
      const orderDetail = await orderDetailService.getById(
        parseInt(req.params.id),
      );
      return new SuccessResponse("Thành công!", orderDetail).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const orderDetail = await orderDetailService.create(req.body.create);
      return new SuccessResponse("Thành công!", orderDetail).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const orderDetail = await orderDetailService.update(req.body.update);
      return new SuccessResponse("Thành công!", orderDetail).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const result = await orderDetailService.delete(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", result).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
};

export default controller;
