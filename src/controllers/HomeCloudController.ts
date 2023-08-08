import { Request, Response } from "express";
import homeCloudService from "../services/HomeCloudService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getHomeCloudSearch: async (req: Request, res: Response) => {
        const homeClouds = await homeCloudService.getHomeCloudSearch(req.body);
        return new SuccessResponse("Thành công!", homeClouds).send(res);
    },
    getHomeCloudById: async (req: Request, res: Response) => {
        try {
            const homeCloud = await homeCloudService.getHomeCloudById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", homeCloud).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    createHomeCloud: async (req: Request, res: Response) => {
        try {
            const homeCloud = await homeCloudService.createHomeCloud(req.body.create);
            return new SuccessResponse("Thành công!", homeCloud).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    updateHomeCloud: async (req: Request, res: Response) => {
        try {
            const homeCloud = await homeCloudService.updateHomeCloud(req.body.update);
            return new SuccessResponse("Thành công!", homeCloud).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    deleteHomeCloud: async (req: Request, res: Response) => {
        try {
            const result = await homeCloudService.deleteHomeCloud(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;