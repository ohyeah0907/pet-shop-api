import { Request, Response } from "express";
import userDeviceService from "../services/UserDeviceService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const userDevices = await userDeviceService.search(req.body);
        return new SuccessResponse("Thành công!", userDevices).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const userDevice = await userDeviceService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", userDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const userDevice = await userDeviceService.create(req.body.create);
            return new SuccessResponse("Thành công!", userDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const userDevice = await userDeviceService.update(req.body.update);
            return new SuccessResponse("Thành công!", userDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    updateTableCheck: async (req: Request, res: Response) => {
        try {
            const userDevice = await userDeviceService.updateTableCheck(req.body.update);
            return new SuccessResponse("Thành công!", userDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await userDeviceService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;