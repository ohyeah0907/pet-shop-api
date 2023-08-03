import { Request, Response } from "express";
import filterService from "../services/FilterService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const filters = await filterService.search(req.body);
        return new SuccessResponse("Thành công!", filters).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const filter = await filterService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", filter).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const filter = await filterService.create(req.body.create);
            return new SuccessResponse("Thành công!", filter).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const filter = await filterService.update(req.body.update);
            return new SuccessResponse("Thành công!", filter).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await filterService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;