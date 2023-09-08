import { Request, Response } from "express";
import languageService from "../services/LanguageService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const languages = await languageService.search(req.body);
        return new SuccessResponse("Thành công!", languages).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const language = await languageService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", language).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const language = await languageService.create(req.body.create);
            return new SuccessResponse("Thành công!", language).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const language = await languageService.update(req.body.update);
            return new SuccessResponse("Thành công!", language).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await languageService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;