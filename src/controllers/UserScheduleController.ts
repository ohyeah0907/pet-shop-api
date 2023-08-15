import { Request, Response } from "express";
import userScheduleService from "../services/UserScheduleService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const userSchedules = await userScheduleService.search(req.body);
        return new SuccessResponse("Thành công!", userSchedules).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const userSchedule = await userScheduleService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", userSchedule).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const userSchedule = await userScheduleService.create(req.body.create);
            return new SuccessResponse("Thành công!", userSchedule).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const userSchedule = await userScheduleService.update(req.body.update);
            return new SuccessResponse("Thành công!", userSchedule).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await userScheduleService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;