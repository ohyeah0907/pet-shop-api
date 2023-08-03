import { Request, Response } from "express";
import roomShortcutService from "../services/RoomShortcutService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
    getSearch: async (req: Request, res: Response) => {
        const roomShortcuts = await roomShortcutService.search(req.body);
        return new SuccessResponse("Thành công!", roomShortcuts).send(res);
    },
    getById: async (req: Request, res: Response) => {
        try {
            const roomShortcut = await roomShortcutService.getById(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", roomShortcut).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const roomShortcut = await roomShortcutService.create(req.body.create);
            return new SuccessResponse("Thành công!", roomShortcut).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const roomShortcut = await roomShortcutService.update(req.body.update);
            return new SuccessResponse("Thành công!", roomShortcut).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const result = await roomShortcutService.delete(parseInt(req.params.id));
            return new SuccessResponse("Thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;