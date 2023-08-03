import { Request, Response } from "express";
import cameraService from "../services/CameraService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const cameras = await cameraService.search(req.body);
        return new SuccessResponse("Thành công!", cameras).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const camera = await cameraService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", camera).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const camera = await cameraService.create(req.body.create);
            return new SuccessResponse("Thành công!", camera).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const camera = await cameraService.update(req.body.update);
            return new SuccessResponse("Thành công!", camera).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await cameraService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;