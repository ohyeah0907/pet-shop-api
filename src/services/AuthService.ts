import { ObjectState, User } from "@prisma/client";
import {
  AuthLogin,
  AuthLoginResponse,
  AuthRegister,
  AuthResend,
  AuthReset,
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
import {
  AuthenticationFailure,
  BadRequest,
  NotFound,
} from "../handler/app-error";
import googleConstants from "../constants/google";
import axios from "axios";

const service = {
  login: async (login: AuthLogin) => {
    const user = await userService.getUserByEmail(login.email);
    if (!bcrypt.compareSync(login.password, user.password))
      throw new AuthenticationFailure("Mật khẩu không chính xác");
    if (!user.is_verified) throw new BadRequest("Tài khoản chưa được xác thực");
    if (user.is_locked) throw new BadRequest("Tài khoản đã bị khóa");

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
        is_admin: user.is_admin,
      },
    };
    return result;
  },
  signInWithGoogle: async (code: string) => {
    // Exchange the authorization code for an access token
    const response = await axios.post(
      "https://www.googleapis.com/oauth2/v4/token",
      {
        code,
        client_id: googleConstants.clientId,
        client_secret: googleConstants.clientSecret,
        redirect_uri: "postmessage",
        grant_type: "authorization_code",
        content_type: "application/x-www-form-urlencoded",
      },
    );
    const accessTokenGoogle = response.data.access_token;
    console.log("Access Token:", accessTokenGoogle);

    // Fetch user details using the access token
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessTokenGoogle}`,
        },
      },
    );
    const profile = userResponse.data;

    if (!profile.email_verified)
      throw new AuthenticationFailure("Tài khoản chưa được xác thực");
    let user: any = null;
    user = await UserRepository.findByEmail(profile.email!);
    if (!user) {
      const create: any = {
        name: profile.name,
        email: profile.email,
        avatar_url: profile.picture,
        phone: "",
        username: profile.email.split("@")[0],
        google_id: profile.sub,
        verification_token: "",
        password: "",
        is_voice: true,
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
        is_admin: user.is_admin,
      },
    };
    return result;
  },
  logout: async (user: any) => {
    await KeyStoreRepository.removeAllForClient(user);
    return true;
  },
  register: async (register: AuthRegister) => {
    const user = await UserRepository.findByEmail(register.email, [
      ObjectState.ACTIVE,
      ObjectState.DELETED,
    ]);
    if (user?.state === ObjectState.ACTIVE) {
      if (user.is_verified) throw new BadRequest(`Email này đã được xác thực!`);
      else throw new BadRequest(`Email này đã được đăng ký!`);
    }

    let userCreate: any = {
      name: "",
      email: register.email,
      phone: "",
      verification_token: v4(),
      username: register.email,
      password: bcrypt.hashSync(register.password, 10),
      is_locked: false,
      is_verified: false,
    };

    if (user?.state === ObjectState.DELETED) {
      userCreate = {
        ...userCreate,
        id: user.id,
        state: ObjectState.ACTIVE,
      };
    }
    const newUser = await UserRepository.save(userCreate);

    const emailResult = await sendMailVerification(
      newUser.email,
      newUser.verification_token,
    );

    if (!emailResult) throw new BadRequest(`Gửi mail thất bại`);

    return true;
  },
  resend: async (resend: AuthResend) => {
    const user: any = await UserRepository.findByEmail(resend.email);

    if (!user) throw new BadRequest(`Không tìm thấy email`);
    if (user.is_verified) throw new BadRequest(`Email này đã được xác thực!`);

    const emailResult = await sendMailVerification(
      user.email,
      user.verification_token,
    );

    if (!emailResult) throw new BadRequest(`Gửi mail thất bại`);

    return true;
  },
  resetPassword: async (reset: AuthReset) => {
    const user: any = await UserRepository.findByEmail(reset.email);

    if (!user) throw new BadRequest(`Không tìm thấy email`);
    if (!user.is_verified)
      throw new BadRequest(`Email này chưa được xác thực!`);
  },
  verify: async (token: string) => {
    const user = await UserRepository.findByVerificationToken(token);
    if (!user) throw new AuthenticationFailure(`Token không hợp lệ`);
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
      is_admin: user.is_admin,
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
