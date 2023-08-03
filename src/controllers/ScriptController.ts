import { Request, Response } from "express";
import scriptService from "../services/ScriptService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const scripts = await scriptService.search(req.body);
        return new SuccessResponse("Thành công!", scripts).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const script = await scriptService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", script).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const script = await scriptService.create(req.body.create);
            return new SuccessResponse("Thành công!", script).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const script = await scriptService.update(req.body.update);
            return new SuccessResponse("Thành công!", script).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await scriptService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;