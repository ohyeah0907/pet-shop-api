import { Request, Response } from "express";
import homeService from "../services/HomeService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getHomeSearch: async (req: Request, res: Response) => {
        const homes = await homeService.getHomeSearch(req.body);
        return new SuccessResponse("Thành công!", homes).send(res);
    },
    getHomeById: async (req: Request, res: Response) => {
        try {
            const home = await homeService.getHomeById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", home).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    getHomeInfo: async (req: Request, res: Response) => {
        try {
            const home = await homeService.getHomeById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", home).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    createHome: async (req: Request, res: Response) => {
        try {
            const home = await homeService.createHome(req.body.create);
            return new SuccessResponse("Thành công!", home).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    updateHome: async (req: Request, res: Response) => {
        try {
            const home = await homeService.updateHome(req.body.update);
            return new SuccessResponse("Thành công!", home).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    deleteHome: async (req: Request, res: Response) => {
        try {
            const result = await homeService.deleteHome(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;