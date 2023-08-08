import { Request, Response } from "express";
import roleHomeService from "../services/RoleHomeService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const roleHomes = await roleHomeService.search(req.body);
        return new SuccessResponse("Thành công!", roleHomes).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const roleHome = await roleHomeService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", roleHome).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const roleHome = await roleHomeService.create(req.body.create);
            return new SuccessResponse("Thành công!", roleHome).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const roleHome = await roleHomeService.update(req.body.update);
            return new SuccessResponse("Thành công!", roleHome).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await roleHomeService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;