import { User } from "@prisma/client";
import { AuthLogin, AuthLoginResponse, UserInfo } from "../dto/auth";
import { createTokens } from "../helper/token";
import KeyStoreRepository from "../repositories/KeyStoreRepository";
import userService from "./UserService";
import bcrypt from "bcrypt";
import crypto from 'crypto';

const service = {
    login: async (login: AuthLogin) => {
        const user = await userService.getUserByUserName(login.username);
        if (!bcrypt.compareSync(login.password, user.password)) throw new Error("Mật khẩu không chính xác");
        if (user.is_locked) throw new Error("Tài khoản đã bị khóa");
        const accessTokenKey = crypto.randomBytes(64).toString('hex');
        const refreshTokenKey = crypto.randomBytes(64).toString('hex');

        await KeyStoreRepository.create(user, accessTokenKey, refreshTokenKey);

        const result: AuthLoginResponse = {
            tokens: await createTokens(user, accessTokenKey, refreshTokenKey),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                username: user.username,
                isAdmin: user.is_admin,
            }
        }
        return result;
    },
    logout: async (user: any) => {
        await KeyStoreRepository.removeAllForClient(user);
        return true;
    },
    info: async (user: User) => {
        const userResponse: UserInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            username: user.username,
            isAdmin: user.is_admin,
        }
        return userResponse;
    }
}

export default service;