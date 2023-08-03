import { Request, Response } from "express";
import roleDeviceService from "../services/RoleDeviceService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const roleDevices = await roleDeviceService.search(req.body);
        return new SuccessResponse("Thành công!", roleDevices).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const roleDevice = await roleDeviceService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", roleDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const roleDevice = await roleDeviceService.create(req.body.create);
            return new SuccessResponse("Thành công!", roleDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const roleDevice = await roleDeviceService.update(req.body.update);
            return new SuccessResponse("Thành công!", roleDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await roleDeviceService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;