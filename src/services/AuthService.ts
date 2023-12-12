import { User } from "@prisma/client";
import {
  AuthLogin,
  AuthLoginResponse,
  AuthRegister,
  AuthResend,
  RefreshTokenResponse,
  UserInfo,
} from "../dto/auth";
import { createAccessToken, createTokens } from "../helper/token";
import KeyStoreRepository from "../repositories/KeyStoreRepository";
import userService from "./UserService";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendMailVerification } from "../middleware/mail";
import { v4 } from "uuid";
import UserRepository from "../repositories/UserRepository";
import { AuthenticationFailure, NotFound } from "../handler/app-error";

const service = {
  login: async (login: AuthLogin) => {
    const user = await userService.getUserByEmail(login.email);
    if (!bcrypt.compareSync(login.password, user.password))
      throw new Error("Mật khẩu không chính xác");
    if (!user.is_verified) throw new Error("Tài khoản chưa được xác thực");
    if (user.is_locked) throw new Error("Tài khoản đã bị khóa");

    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");

    await KeyStoreRepository.create(user, refreshTokenKey);

    const result: AuthLoginResponse = {
      tokens: await createTokens(user, accessTokenKey, refreshTokenKey),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        isAdmin: user.is_admin,
      },
    };
    return result;
  },
  signInWithGoogle: async (userGoogle: any) => {
    const profile = userGoogle.profile;

    if (!profile)
      throw new AuthenticationFailure("Không tìm thấy thông tin từ google");

    if (!profile._json.email_verified)
      throw new AuthenticationFailure("Email này chưa được xác thực!");

    let user: any = null;
    user = await UserRepository.findByEmail(profile._json.email!);
    if (!user) {
      const create: any = {
        name: profile._json.family_name + " " + profile._json.given_name!,
        email: profile._json.email,
        avatar_url: profile._json.picture,
        phone: "",
        username: profile._json.email.split("@")[0],
        google_id: profile.id,
        verification_token: "",
        password: "",
        is_locked: true,
        is_verified: true,
      };
      user = await UserRepository.save(create);
    }
    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");

    await KeyStoreRepository.create(user, refreshTokenKey);

    const result: AuthLoginResponse = {
      tokens: await createTokens(user, accessTokenKey, refreshTokenKey),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        isAdmin: user.is_admin,
      },
    };
    return result;
  },
  logout: async (user: any) => {
    await KeyStoreRepository.removeAllForClient(user);
    return true;
  },
  register: async (register: AuthRegister) => {
    const user = await UserRepository.findByEmail(register.email);

    if (user != null) throw new Error(`Email đã tồn tại`);
    const userCreate: any = {
      name: "",
      email: register.email,
      phone: "",
      verification_token: v4(),
      username: register.email,
      password: bcrypt.hashSync(register.password, 10),
      is_locked: false,
      is_verified: false,
    };
    const newUser = await UserRepository.save(userCreate);

    const emailResult = await sendMailVerification(
      newUser.email,
      newUser.verification_token,
    );

    if (!emailResult) throw new Error(`Gửi mail thất bại`);

    return true;
  },
  resend: async (resend: AuthResend) => {
    const user: any = await UserRepository.findByEmail(resend.email);

    if (!user) throw new Error(`Không tìm thấy email`);

    const emailResult = await sendMailVerification(
      user.email,
      user.verification_token,
    );

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
    };
    return userResponse;
  },
  refreshToken: async (refreshToken: string) => {
    const keyStore = await KeyStoreRepository.findByRefreshToken(refreshToken);

    if (!keyStore) throw new NotFound("Không tìm thấy refresh token");

    const accessTokenKey = crypto.randomBytes(64).toString("hex");

    const result: RefreshTokenResponse = {
      access_token: await createAccessToken(
        keyStore.client_id as any,
        accessTokenKey,
      ),
    };
    return result;
  },
};

export default service;
