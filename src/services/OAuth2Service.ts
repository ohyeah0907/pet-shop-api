import { codeConstants, tokenConstants } from "../constants";
import { AccessTokenLogin, AuthLogin, AuthRegister, AuthResend, AuthorizeCodeLogin, AuthorizeCodeLoginResponse, CredentialLogin } from "../dto/oauth2";
import { encrypt, decrypt } from "../helper/code";
import voiceProjectService from "./VoiceProjectService";
import UserRepository from "../repositories/UserRepository";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { UserCreate } from "../dto/user";
import { v4 } from "uuid";
import { sendMailVerification } from "../middleware/mail"
import voiceSessionRepository from "../repositories/VoiceSessionRepository";
import { UserSocial } from "@prisma/client";
import UserSocialRepository from "../repositories/UserSocialRepository";

const service = {

    login: async (login: AuthLogin) => {
        const user = await UserRepository.findByEmail(login.email);

        if (!user) throw new Error(`Không tìm thấy email`);

        if (!bcrypt.compareSync(login.password, user.password)) throw new Error(`Sai mật khẩu`);

        if (!user.is_verified) throw new Error(`Tài khoản chưa được xác thực`);

        if (user.is_locked) throw new Error(`Tài khoản đã bị khóa`);

        // const redirect_link = `/oauth2/authorize?client_id=${authorize.client_id}&redirect_uri=${authorize.redirect_uri}&response_type=${authorize.response_type}&state=${authorize.state}`;
        return !!user;
    },
    loginGoogle: async (userGoogle: any) => {
        const profile = userGoogle.profile;

        if (!profile) throw new Error("Không tìm thấy thông tin từ google")

        if (!profile._json.email_verified) throw new Error("Email này chưa được xác thực!")

        let user: any = null;
        user = await UserRepository.findByEmail(profile._json.email!);
        if (!user) {
            const create: any = {
                name: profile._json.family_name + ' ' + profile._json.given_name!,
                email: profile._json.email,
                avatar_url: profile._json.picture,
                phone: "",
                username: profile._json.email,
                verification_token: "",
                password: "",
                is_voice: true,
                is_locked: true,
            }
            user = await UserRepository.save(create);
            let social: any = {
                access_token: userGoogle.access_token,
                provider_name: "GOOGLE",
                provider_id: profile.id,
                avatar_url: profile._json.picture,
                email: profile._json.email,
                name: profile.displayName,
                user_id: user.id,
            }

            social = await UserSocialRepository.save(social);
        }

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
            is_locked: true,
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
    authorize: async (authorize: AuthorizeCodeLogin, user_id: number) => {
        authorize.user_id = user_id;
        const voiceProject = await voiceProjectService.getByClientIdAndRedirectUrl(authorize.client_id, authorize.redirect_uri);
        if (!voiceProject) throw new Error(`Không tìm thấy voiceProject với client_id: ${authorize.client_id} và redirect_uri: ${authorize.redirect_uri}`);

        const text = JSON.stringify(authorize);

        // Defining iv
        const code = encrypt(text);
        const redirect_link = `${authorize.redirect_uri}?code=${code}&state=${authorize.state}`;
        console.log(redirect_link);

        return redirect_link;
    },
    access_token: async (accessTokenLogin: AccessTokenLogin) => {
        switch (accessTokenLogin.grant_type) {
            case "authorization_code":
                if (!accessTokenLogin.code) throw new Error(`Code bị thiếu`);
                if (!accessTokenLogin.client_id) throw new Error(`Client_id bị thiếu`);
                if (!accessTokenLogin.redirect_uri) throw new Error(`Redirect_uri bị thiếu`);

                const voiceProject = await voiceProjectService.getByClientIdAndRedirectUrlAndClientSecret(accessTokenLogin.client_id, accessTokenLogin.redirect_uri, accessTokenLogin.client_secret);
                let object: any = null;

                try {
                    object = JSON.parse(decrypt(accessTokenLogin.code));
                } catch (e) {
                    throw new Error(`Code không hợp lệ`);
                }
                if (
                    voiceProject.client_id !== object.client_id
                    || !(voiceProject.redirect_uris.filter((item) => { return object.redirect_uri.includes(item) }).length > 0)
                ) throw new Error(`Client_id hoặc redirect url không khớp`);

                const access_token = crypto.randomBytes(32).toString('hex');
                const refresh_token = crypto.randomBytes(32).toString('hex');
                const expires_in = tokenConstants.expires_in;
                const voiceSession: any = {
                    access_token: access_token,
                    refresh_token: refresh_token,
                    expired_at: new Date(new Date().getTime() + Number(expires_in)),
                    voice_project_id: voiceProject.id,
                    user_id: object.user_id,
                }

                await voiceSessionRepository.save(voiceSession)

                return {
                    access_token: access_token,
                    token_type: tokenConstants.token_type,
                    expires_in: expires_in,
                    refresh_token: refresh_token,
                }
            case "refresh_token":
                if (!accessTokenLogin.refresh_token) throw new Error(`Refresh token bị thiếu`);
                if (!accessTokenLogin.client_id) throw new Error(`Client_id bị thiếu`);

                const voiceSessionRefresh = await voiceSessionRepository.findByRefreshToken(accessTokenLogin.refresh_token);
                if (!voiceSessionRefresh) throw new Error(`Refresh token không hợp lệ`);

                if (voiceSessionRefresh.voice_project.client_id !== accessTokenLogin.client_id) throw new Error(`Client_id không hợp lệ`);

                const access_token_refresh = crypto.randomBytes(32).toString('hex');
                const refresh_token_refresh = crypto.randomBytes(32).toString('hex');
                const expires_in_refresh = tokenConstants.expires_in;
                voiceSessionRefresh.access_token = access_token_refresh;
                voiceSessionRefresh.refresh_token = refresh_token_refresh;
                voiceSessionRefresh.expired_at = new Date(new Date().getTime() + Number(expires_in_refresh));

                await voiceSessionRepository.save(voiceSessionRefresh)

                return {
                    access_token: access_token_refresh,
                    token_type: tokenConstants.token_type,
                    expires_in: expires_in_refresh,
                    refresh_token: refresh_token_refresh,
                }
            default:
                throw new Error(`Grant type không hợp lệ`);
        }
    }

}

export default service;