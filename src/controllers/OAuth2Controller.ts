import { Request, Response } from "express";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";
import service from "../services/OAuth2Service";

const controller = {
    authorize: async (req: Request, res: Response) => {
        try {
            const result = await service.authorize(req.query as any);
            res.redirect(result);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    access_token: async (req: Request, res: Response) => {
        try {
            const result = await service.access_token(req.body);
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },

}

export default controller;