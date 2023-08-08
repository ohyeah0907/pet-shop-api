import { Request, Response } from "express";
import userHomeService from "../services/UserHomeService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const userHomes = await userHomeService.search(req.body);
        return new SuccessResponse("Thành công!", userHomes).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const userHome = await userHomeService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", userHome).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const userHome = await userHomeService.create(req.body.create);
            return new SuccessResponse("Thành công!", userHome).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const userHome = await userHomeService.update(req.body.update);
            return new SuccessResponse("Thành công!", userHome).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await userHomeService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;