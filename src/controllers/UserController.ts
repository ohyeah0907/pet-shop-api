import { Request, Response } from "express";
import userService from "../services/UserService";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";

const controller = {
  getUserSearch: async (req: Request, res: Response) => {
    console.log("user");
    const users = await userService.getUserSearch(req.body);
    return new SuccessResponse("Thành công!", users).send(res);
  },
  getUserById: async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserById(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", user).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  createUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.createUser(req.body.create);
      return new SuccessResponse("Thành công!", user).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.updateUser(req.body.update);
      return new SuccessResponse("Thành công!", user).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const result = await userService.deleteUser(parseInt(req.params.id));
      return new SuccessResponse("Thành công!", result).send(res);
    } catch (error: any) {
      return new BadRequestResponse(error.message).send(res);
    }
  },
};

export default controller;
