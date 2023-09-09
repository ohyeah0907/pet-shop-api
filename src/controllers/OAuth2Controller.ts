import { Request, Response } from "express";
import { BadRequestResponse, SuccessResponse } from "../handler/app-response";
import express from "express";
import service from "../services/OAuth2Service";
import passport from "passport";

const controller = {
    loginView: async (req: Request, res: Response) => {
        try {
            res.render("login");
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    registerView: async (req: Request, res: Response) => {
        try {
            res.render("register");
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    login: async (req: Request, res: Response) => {
        const authorize = req.query as any;
        if (!authorize.client_id || !authorize.redirect_uri || !authorize.response_type || !authorize.state)
            return new BadRequestResponse("Invalid").send(res);
        try {
            res.redirect(`/oauth2/login/authorize?client_id=${authorize.client_id}&redirect_uri=${authorize.redirect_uri}&response_type=${authorize.response_type}&state=${authorize.state}`);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    loginGoogle: async (req: Request, res: Response) => {
        try {
            const session = req.session as any;

            const authorize = session.passport.user.authorize
            if (!authorize.client_id || !authorize.redirect_uri || !authorize.response_type || !authorize.state)
                return new BadRequestResponse("Invalid").send(res);

            const result = await service.loginGoogle(session.passport.user);
            if (result) {
                const redirectUrl = `/oauth2/login/authorize?client_id=${authorize.client_id}&redirect_uri=${authorize.redirect_uri}&response_type=${authorize.response_type}&state=${authorize.state}`;
                res.redirect(redirectUrl);
            }
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    register: async (req: Request, res: Response) => {
        try {
            const result = await service.register(req.body.register);
            return new SuccessResponse("Đăng ký thành công, bạn hãy check email để xác thực tài khoản!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    resend: async (req: Request, res: Response) => {
        try {
            const result = await service.resend(req.body.resend);
            return new SuccessResponse("Bạn hãy check email để xác thực tài khoản!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    verify: async (req: Request, res: Response) => {
        try {
            const result = await service.verify(req.params.token);
            return new SuccessResponse("Xác thực thành công!", result).send(res);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(res);
        }
    },
    authorize: async (req: Request, res: Response) => {
        try {
            const session = req.session as any;
            const result = await service.authorize(req.query as any, session.passport.user);
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