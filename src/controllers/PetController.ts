import { Request, Response } from "express";
import petService from "../services/PetService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
  getSearch: async (req: Request, res: Response) => {
    const pets = await petService.getSearch(req.body?.search || {});
    return new SuccessResponse("Thành công!", pets).send(res);
  },
  getById: async (req: Request, res: Response) => {
    try {
      const pet = await petService.getById(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", pet).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const pet = await petService.create(req.body.create);
      return new SuccessResponse("Thành công!", pet).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const pet = await petService.update(req.body.update);
      return new SuccessResponse("Thành công!", pet).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const result = await petService.delete(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", result).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
};

export default controller;
