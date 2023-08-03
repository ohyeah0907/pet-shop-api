import { Request, Response } from "express";
import roleHouseService from "../services/RoleHouseService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const roleHouses = await roleHouseService.search(req.body);
        return new SuccessResponse("Thành công!", roleHouses).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const roleHouse = await roleHouseService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", roleHouse).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const roleHouse = await roleHouseService.create(req.body.create);
            return new SuccessResponse("Thành công!", roleHouse).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const roleHouse = await roleHouseService.update(req.body.update);
            return new SuccessResponse("Thành công!", roleHouse).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await roleHouseService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;