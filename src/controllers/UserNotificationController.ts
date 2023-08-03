import { Request, Response } from "express";
import userNotificationService from "../services/UserNotificationService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const userNotifications = await userNotificationService.search(req.body);
        return new SuccessResponse("Thành công!", userNotifications).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const userNotification = await userNotificationService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", userNotification).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const userNotification = await userNotificationService.create(req.body.create);
            return new SuccessResponse("Thành công!", userNotification).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const userNotification = await userNotificationService.update(req.body.update);
            return new SuccessResponse("Thành công!", userNotification).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await userNotificationService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;