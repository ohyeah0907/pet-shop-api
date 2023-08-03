import { Request, Response } from "express";
import sensorService from "../services/SensorService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const sensors = await sensorService.search(req.body);
        return new SuccessResponse("Thành công!", sensors).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const sensor = await sensorService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", sensor).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const sensor = await sensorService.create(req.body.create);
            return new SuccessResponse("Thành công!", sensor).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const sensor = await sensorService.update(req.body.update);
            return new SuccessResponse("Thành công!", sensor).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await sensorService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;