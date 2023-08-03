import { Request, Response } from "express";
import roleScheduleService from "../services/RoleScheduleService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const roleSchedules = await roleScheduleService.search(req.body);
        return new SuccessResponse("Thành công!", roleSchedules).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const roleSchedule = await roleScheduleService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", roleSchedule).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const roleSchedule = await roleScheduleService.create(req.body.create);
            return new SuccessResponse("Thành công!", roleSchedule).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const roleSchedule = await roleScheduleService.update(req.body.update);
            return new SuccessResponse("Thành công!", roleSchedule).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await roleScheduleService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;