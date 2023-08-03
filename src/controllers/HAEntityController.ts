import { Request, Response } from "express";
import haEntityService from "../services/HAEntityService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const haEntitys = await haEntityService.search(req.body);
        return new SuccessResponse("Thành công!", haEntitys).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const haEntity = await haEntityService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", haEntity).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const haEntity = await haEntityService.create(req.body.create);
            return new SuccessResponse("Thành công!", haEntity).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const haEntity = await haEntityService.update(req.body.update);
            return new SuccessResponse("Thành công!", haEntity).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await haEntityService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;