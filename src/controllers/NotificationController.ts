import { Request, Response } from "express";
import notificationService from "../services/NotificationService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const notifications = await notificationService.search(req.body);
        return new SuccessResponse("Thành công!", notifications).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const notification = await notificationService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", notification).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const notification = await notificationService.create(req.body.create);
            return new SuccessResponse("Thành công!", notification).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const notification = await notificationService.update(req.body.update);
            return new SuccessResponse("Thành công!", notification).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await notificationService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;