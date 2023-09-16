import { Request, Response } from "express";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";
import express from "express";
import service from "../services/HAService";
import passport from "passport";

const controller = {
    token: async (req: Request, res: Response) => {
        try {
            const result = await service.token(req.body);
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    syncDevicefromHAServer: async (req: Request, res: Response) => {
        try {
            const result = await service.syncDevicefromHAServer(req.body);
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },

}

export default controller;