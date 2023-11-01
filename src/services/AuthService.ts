import { User } from "@prisma/client";
import { AuthLogin, AuthLoginResponse, AuthRegister, AuthResend, UserInfo } from "../dto/auth";
import { createTokens } from "../helper/token";
import KeyStoreRepository from "../repositories/KeyStoreRepository";
import userService from "./UserService";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import { sendMailVerification } from "../middleware/mail"
import { v4 } from "uuid";
import UserRepository from "../repositories/UserRepository";

const service = {
    login: async (login: AuthLogin) => {
        const user = await userService.getUserByEmail(login.email);
        if (!bcrypt.compareSync(login.password, user.password)) throw new Error("Mật khẩu không chính xác");
        if (!user.is_verified) throw new Error("Tài khoản chưa được xác thực");
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
    register: async (register: AuthRegister) => {
        const user = await UserRepository.findByEmail(register.email);

        if (user != null) throw new Error(`Email đã tồn tại`)
        const userCreate: any = {
            name: "",
            email: register.email,
            phone: "",
            verification_token: v4(),
            username: register.email,
            password: bcrypt.hashSync(register.password, 10),
            is_voice: true,
            is_locked: false,
            is_verified: false
        }
        const newUser = await UserRepository.save(userCreate);

        const emailResult = await sendMailVerification(newUser.email, newUser.verification_token)

        if (!emailResult) throw new Error(`Gửi mail thất bại`);

        return true;

    },
    resend: async (resend: AuthResend) => {
        const user: any = await UserRepository.findByEmail(resend.email);

        if (!user) throw new Error(`Không tìm thấy email`);

        const emailResult = await sendMailVerification(user.email, user.verification_token)

        if (!emailResult) throw new Error(`Gửi mail thất bại`);

        return true;
    },
    verify: async (token: string) => {
        const user = await UserRepository.findByVerificationToken(token);
        if (!user) throw new Error(`Token không hợp lệ`);
        user.is_verified = true;
        user.verification_token = "";
        user.verified_at = new Date();
        await UserRepository.save(user);
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