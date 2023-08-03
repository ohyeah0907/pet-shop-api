import { Request, Response } from "express";
import tagService from "../services/TagService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const tags = await tagService.search(req.body);
        return new SuccessResponse("Thành công!", tags).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const tag = await tagService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", tag).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const tag = await tagService.create(req.body.create);
            return new SuccessResponse("Thành công!", tag).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const tag = await tagService.update(req.body.update);
            return new SuccessResponse("Thành công!", tag).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await tagService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;