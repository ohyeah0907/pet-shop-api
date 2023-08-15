import { Request, Response } from "express";
import userFCMService from "../services/UserFCMService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const userFCMs = await userFCMService.search(req.body);
        return new SuccessResponse("Thành công!", userFCMs).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const userFCM = await userFCMService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", userFCM).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const userFCM = await userFCMService.create(req.body.create);
            return new SuccessResponse("Thành công!", userFCM).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const userFCM = await userFCMService.update(req.body.update);
            return new SuccessResponse("Thành công!", userFCM).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await userFCMService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;