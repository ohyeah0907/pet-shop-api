import { Request, Response } from "express";
import actionableService from "../services/ActionableService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const actionables = await actionableService.search(req.body);
        return new SuccessResponse("Thành công!", actionables).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const actionable = await actionableService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", actionable).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const actionable = await actionableService.create(req.body.create);
            return new SuccessResponse("Thành công!", actionable).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const actionable = await actionableService.update(req.body.update);
            return new SuccessResponse("Thành công!", actionable).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await actionableService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;