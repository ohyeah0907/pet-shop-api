import { Request, Response } from "express";
import deviceService from "../services/DeviceService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const devices = await deviceService.search(req.body);
        return new SuccessResponse("Thành công!", devices).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const device = await deviceService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", device).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const device = await deviceService.create(req.body.create);
            return new SuccessResponse("Thành công!", device).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const device = await deviceService.update(req.body.update);
            return new SuccessResponse("Thành công!", device).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await deviceService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;