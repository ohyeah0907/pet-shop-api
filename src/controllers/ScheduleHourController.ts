import { Request, Response } from "express";
import scheduleHourService from "../services/ScheduleHourService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const scheduleHours = await scheduleHourService.search(req.body);
        return new SuccessResponse("Thành công!", scheduleHours).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const scheduleHour = await scheduleHourService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", scheduleHour).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const scheduleHour = await scheduleHourService.create(req.body.create);
            return new SuccessResponse("Thành công!", scheduleHour).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const scheduleHour = await scheduleHourService.update(req.body.update);
            return new SuccessResponse("Thành công!", scheduleHour).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await scheduleHourService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;