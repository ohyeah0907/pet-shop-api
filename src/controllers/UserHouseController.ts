import { Request, Response } from "express";
import userHouseService from "../services/UserHouseService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const userHouses = await userHouseService.search(req.body);
        return new SuccessResponse("Thành công!", userHouses).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const userHouse = await userHouseService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", userHouse).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const userHouse = await userHouseService.create(req.body.create);
            return new SuccessResponse("Thành công!", userHouse).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const userHouse = await userHouseService.update(req.body.update);
            return new SuccessResponse("Thành công!", userHouse).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await userHouseService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;