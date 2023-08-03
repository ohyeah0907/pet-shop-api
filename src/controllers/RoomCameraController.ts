import { Request, Response } from "express";
import roomCameraService from "../services/RoomCameraService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const roomCameras = await roomCameraService.search(req.body);
        return new SuccessResponse("Thành công!", roomCameras).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const roomCamera = await roomCameraService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", roomCamera).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const roomCamera = await roomCameraService.create(req.body.create);
            return new SuccessResponse("Thành công!", roomCamera).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const roomCamera = await roomCameraService.update(req.body.update);
            return new SuccessResponse("Thành công!", roomCamera).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await roomCameraService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;