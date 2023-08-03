import { Request, Response } from "express";
import automationService from "../services/AutomationService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const automations = await automationService.search(req.body);
        return new SuccessResponse("Thành công!", automations).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const automation = await automationService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", automation).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const automation = await automationService.create(req.body.create);
            return new SuccessResponse("Thành công!", automation).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const automation = await automationService.update(req.body.update);
            return new SuccessResponse("Thành công!", automation).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await automationService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;