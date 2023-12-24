import { Request, Response } from "express";
import accessoryService from "../services/AccessoryService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
  getSearch: async (req: Request, res: Response) => {
    const accessorys = await accessoryService.getSearch(req.body?.search || {});
    return new SuccessResponse("Thành công!", accessorys).send(res);
  },
  getById: async (req: Request, res: Response) => {
    try {
      const accessory = await accessoryService.getById(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", accessory).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const accessory = await accessoryService.create(req.body.create);
      return new SuccessResponse("Thành công!", accessory).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const accessory = await accessoryService.update(req.body.update);
      return new SuccessResponse("Thành công!", accessory).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const result = await accessoryService.delete(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", result).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
};

export default controller;
