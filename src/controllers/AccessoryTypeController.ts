import { Request, Response } from "express";
import accessoryTypeService from "../services/AccessoryTypeService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
  getSearch: async (req: Request, res: Response) => {
    const accessoryTypes = await accessoryTypeService.getSearch(
      req.body?.search,
      req.body?.include,
    );
    return new SuccessResponse("Thành công!", accessoryTypes).send(res);
  },
  getById: async (req: Request, res: Response) => {
    try {
      const accessoryType = await accessoryTypeService.getById(
        parseInt(req.params.id),
      );
      return new SuccessResponse("Thành công!", accessoryType).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const accessoryType = await accessoryTypeService.create(req.body.create);
      return new SuccessResponse("Thành công!", accessoryType).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const accessoryType = await accessoryTypeService.update(req.body.update);
      return new SuccessResponse("Thành công!", accessoryType).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const result = await accessoryTypeService.delete(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", result).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
};

export default controller;
