import { Request, Response } from "express";
import roleService from "../services/RoleService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getRoleSearch: async (req: Request, res: Response) => {
        const roles = await roleService.getRoleSearch(req.body);
        return new SuccessResponse("Thành công!", roles).send(res);
    },
    getRoleById: async (req: Request, res: Response) => {
        try {
            const role = await roleService.getRoleById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", role).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    createRole: async (req: Request, res: Response) => {
        try {
            const role = await roleService.createRole(req.body.create);
            return new SuccessResponse("Thành công!", role).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    updateRole: async (req: Request, res: Response) => {
        try {
            const role = await roleService.updateRole(req.body.update);
            return new SuccessResponse("Thành công!", role).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    deleteRole: async (req: Request, res: Response) => {
        try {
            const result = await roleService.deleteRole(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;