import { Request, Response } from "express";
import petTypeService from "../services/PetTypeService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const petTypes = await petTypeService.getSearch(req.body);
        return new SuccessResponse("Thành công!", petTypes).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const petType = await petTypeService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", petType).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const petType = await petTypeService.create(req.body.create);
            return new SuccessResponse("Thành công!", petType).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const petType = await petTypeService.update(req.body.update);
            return new SuccessResponse("Thành công!", petType).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await petTypeService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
}

export default controller;