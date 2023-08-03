import { Request, Response } from "express";
import scheduleWeekService from "../services/ScheduleWeekService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const scheduleWeeks = await scheduleWeekService.search(req.body);
        return new SuccessResponse("Thành công!", scheduleWeeks).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const scheduleWeek = await scheduleWeekService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", scheduleWeek).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const scheduleWeek = await scheduleWeekService.create(req.body.create);
            return new SuccessResponse("Thành công!", scheduleWeek).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const scheduleWeek = await scheduleWeekService.update(req.body.update);
            return new SuccessResponse("Thành công!", scheduleWeek).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await scheduleWeekService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;