import { Request, Response } from "express";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";
import authService from "../services/AuthService";
import { ProtectedRequest } from "../types/app-request";
import { UserInfo } from "../dto/auth";
    
const controller = {
    login: async (req: Request, res: Response) => {
        try {
            const result = await authService.login(req.body.login);
            return new SuccessResponse("Đăng nhập thành công", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    register: async (req: Request, res: Response) => {
        try {
            const result = await authService.register(req.body.register);
            return new SuccessResponse("Đăng ký thành công", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    logout: async (req: ProtectedRequest, res: Response) => {
        try {
            const result = await authService.logout(req.user);
            return new SuccessResponse("Đăng xuất thành công", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        try {
            const { accessToken, refreshToken } = req.headers;

        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    resend: async (req: Request, res: Response) => {
        try {
            const result = await authService.resend(req.body.resend);
            return new SuccessResponse("Bạn hãy check email để xác thực tài khoản!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    verify: async (req: Request, res: Response) => {
        try {
            const result = await authService.verify(req.params.token);
            return new SuccessResponse("Xác thực thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    info: async (req: ProtectedRequest, res: Response) => {
        try {
            const { accessToken, refreshToken } = req.headers;
            const userInfo = await authService.info(req.user);
            return new SuccessResponse("Lấy thông tin thành công", userInfo).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    }
}

export default controller;