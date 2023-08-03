import { Request, Response } from "express";
import houseService from "../services/HouseService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getHouseSearch: async (req: Request, res: Response) => {
        const houses = await houseService.getHouseSearch(req.body);
        return new SuccessResponse("Thành công!", houses).send(res);
    },
    getHouseById: async (req: Request, res: Response) => {
        try {
            const house = await houseService.getHouseById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", house).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    createHouse: async (req: Request, res: Response) => {
        try {
            const house = await houseService.createHouse(req.body.create);
            return new SuccessResponse("Thành công!", house).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    updateHouse: async (req: Request, res: Response) => {
        try {
            const house = await houseService.updateHouse(req.body.update);
            return new SuccessResponse("Thành công!", house).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    deleteHouse: async (req: Request, res: Response) => {
        try {
            const result = await houseService.deleteHouse(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;