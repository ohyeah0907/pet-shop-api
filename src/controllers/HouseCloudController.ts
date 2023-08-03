import { Request, Response } from "express";
import houseCloudService from "../services/HouseCloudService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getHouseCloudSearch: async (req: Request, res: Response) => {
        const houseClouds = await houseCloudService.getHouseCloudSearch(req.body);
        return new SuccessResponse("Thành công!", houseClouds).send(res);
    },
    getHouseCloudById: async (req: Request, res: Response) => {
        try {
            const houseCloud = await houseCloudService.getHouseCloudById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", houseCloud).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    createHouseCloud: async (req: Request, res: Response) => {
        try {
            const houseCloud = await houseCloudService.createHouseCloud(req.body.create);
            return new SuccessResponse("Thành công!", houseCloud).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    updateHouseCloud: async (req: Request, res: Response) => {
        try {
            const houseCloud = await houseCloudService.updateHouseCloud(req.body.update);
            return new SuccessResponse("Thành công!", houseCloud).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    deleteHouseCloud: async (req: Request, res: Response) => {
        try {
            const result = await houseCloudService.deleteHouseCloud(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;