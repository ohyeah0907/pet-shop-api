import { Request, Response } from "express";
import userRoomDeviceService from "../services/UserRoomDeviceService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const userRoomDevices = await userRoomDeviceService.search(req.body);
        return new SuccessResponse("Thành công!", userRoomDevices).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const userRoomDevice = await userRoomDeviceService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", userRoomDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const userRoomDevice = await userRoomDeviceService.create(req.body.create);
            return new SuccessResponse("Thành công!", userRoomDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const userRoomDevice = await userRoomDeviceService.update(req.body.update);
            return new SuccessResponse("Thành công!", userRoomDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    updateTableCheck: async (req: Request, res: Response) => {
        try {
            const userRoomDevice = await userRoomDeviceService.updateTableCheck(req.body.update);
            return new SuccessResponse("Thành công!", userRoomDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await userRoomDeviceService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;