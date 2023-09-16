import { Request, Response } from "express";
import deviceTypeService from "../services/DeviceTypeService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";
import { DeviceTypeCode } from "@prisma/client";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const deviceTypes = await deviceTypeService.search(req.body);
        return new SuccessResponse("Thành công!", deviceTypes).send(res);
    },
    codes: async (req: Request, res: Response) => {
        const codes: string[] = [];
        for(let value of Object.values(DeviceTypeCode)) {
            console.log(value);
        }
        return new SuccessResponse("Thành công!", codes).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const deviceType = await deviceTypeService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", deviceType).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const deviceType = await deviceTypeService.create(req.body.create);
            return new SuccessResponse("Thành công!", deviceType).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const deviceType = await deviceTypeService.update(req.body.update);
            return new SuccessResponse("Thành công!", deviceType).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await deviceTypeService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;