import { Request, Response } from "express";
import voiceProjectService from "../services/VoiceProjectService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const voiceProjects = await voiceProjectService.search(req.body);
        return new SuccessResponse("Thành công!", voiceProjects).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const voiceProject = await voiceProjectService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", voiceProject).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const voiceProject = await voiceProjectService.create(req.body.create);
            return new SuccessResponse("Thành công!", voiceProject).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const voiceProject = await voiceProjectService.update(req.body.update);
            return new SuccessResponse("Thành công!", voiceProject).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await voiceProjectService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;