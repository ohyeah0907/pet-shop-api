import { Request, Response } from "express";
import roomDeviceService from "../services/RoomDeviceService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const roomDevices = await roomDeviceService.search(req.body);
        return new SuccessResponse("Thành công!", roomDevices).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const roomDevice = await roomDeviceService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", roomDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const roomDevice = await roomDeviceService.create(req.body.create);
            return new SuccessResponse("Thành công!", roomDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const roomDevice = await roomDeviceService.update(req.body.update);
            return new SuccessResponse("Thành công!", roomDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    updateDragAndDrop: async (req: Request, res: Response) => {
        try {
            const roomDevice = await roomDeviceService.updateDragAndDrop(req.body.updateDragAndDrop);
            return new SuccessResponse("Thành công!", roomDevice).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await roomDeviceService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;