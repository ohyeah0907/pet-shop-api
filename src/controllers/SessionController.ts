import { Request, Response } from "express";
import sessionService from "../services/SessionService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const roles = await sessionService.search(req.body);
        return new SuccessResponse("Thành công!", roles).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const role = await sessionService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", role).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const role = await sessionService.create(req.body.create);
            return new SuccessResponse("Thành công!", role).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const role = await sessionService.update(req.body.update);
            return new SuccessResponse("Thành công!", role).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await sessionService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (err: any) {
            return new BadRequestResponse(err.message).send(res);
        }
    }

}

export default controller;