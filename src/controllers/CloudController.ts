import { Request, Response } from "express";
import cloudService from "../services/CloudService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getCloudSearch: async (req: Request, res: Response) => {
        const clouds = await cloudService.getCloudSearch(req.body);
        return new SuccessResponse("Thành công!", clouds).send(res);
    },
    getCloudById: async (req: Request, res: Response) => {
        try {
            const cloud = await cloudService.getCloudById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", cloud).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    createCloud: async (req: Request, res: Response) => {
        try {
            const cloud = await cloudService.createCloud(req.body.create);
            return new SuccessResponse("Thành công!", cloud).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    updateCloud: async (req: Request, res: Response) => {
        try {
            const cloud = await cloudService.updateCloud(req.body.update);
            return new SuccessResponse("Thành công!", cloud).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    deleteCloud: async (req: Request, res: Response) => {
        try {
            const result = await cloudService.deleteCloud(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;