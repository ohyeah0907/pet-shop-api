import { codeConstants, tokenConstants } from "../constants";
import { AccessTokenLogin, AuthorizeCodeLogin, AuthorizeCodeLoginResponse, CredentialLogin } from "../dto/oauth2";
import { encrypt, decrypt } from "../helper/code";
import voiceProjectService from "./VoiceProjectService";
import userService from "./UserService";
import crypto from "crypto";
import bcrypt from "bcrypt";

const service = {
   
    login: async (authorize: CredentialLogin) => {
        const user = await userService.getUserByUserName(authorize.username);

        if(!bcrypt.compareSync(authorize.password, user.password)) throw new Error(`Sai mật khẩu`);

        const redirect_link = `/oauth2/authorize?client_id=${authorize.client_id}&redirect_uri=${authorize.redirect_uri}&response_type=${authorize.response_type}&state=${authorize.state}`;
        return redirect_link;
    },
    authorize: async (authorize: AuthorizeCodeLogin) => {
        const voiceProject = await voiceProjectService.getByClientIdAndRedirectUrl(authorize.client_id, authorize.redirect_uri);

        if (!voiceProject) throw new Error(`Không tìm thấy voiceProject với client_id: ${authorize.client_id} và redirect_uri: ${authorize.redirect_uri}`);

        const text = JSON.stringify(authorize);

        // Defining iv
        const code = encrypt(text);
        const redirect_link = `${authorize.redirect_uri}?code=${code}&state=${authorize.state}`;
        return redirect_link;
    },
    access_token: async (accessTokenLogin: AccessTokenLogin) => {
        const voiceProject = await voiceProjectService.getByClientIdAndRedirectUrlAndClientSecret(accessTokenLogin.client_id, accessTokenLogin.redirect_uri, accessTokenLogin.client_secret);

        let object: any = null;

        try {
            object = JSON.parse(decrypt(accessTokenLogin.code));
        } catch (e) {
            throw new Error(`Code không hợp lệ`);
        }
        if (
            voiceProject.client_id !== object.client_id
            || !voiceProject.redirect_uris.includes(object.redirect_uri)
        ) throw new Error(`Client_id hoặc redirect url không khớp`);

        const secret_id = object.secret_id;
        
        const access_token = crypto.randomBytes(32).toString('hex');
        const refresh_token = crypto.randomBytes(32).toString('hex');
        const expires_in = tokenConstants.expires_in;

        const accessTokenResponse = {
            access_token: access_token,
            token_type: tokenConstants.token_type,
            expires_in: expires_in,
            refresh_token: refresh_token,
        };

        return accessTokenResponse;
    }

}

export default service;