import { codeConstants, tokenConstants } from '../constants';
import { AccessTokenLogin, AuthLogin, AuthRegister, AuthResend, AuthorizeCodeLogin, AuthorizeCodeLoginResponse, CredentialLogin } from '../dto/oauth2';
import { encrypt, decrypt } from '../helper/code';
import voiceProjectService from './VoiceProjectService';
import UserRepository from '../repositories/UserRepository';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { HARefreshTokenResponse, HATokenRequest, HATokenResponse } from '../dto/ha';
import homeService from '../services/HomeService'
import UserHomeRepository from '../repositories/UserHomeRepository'
import axios from 'axios'
import { GrantType } from '../constants/enum';
import authorization from '../middleware/authorization';
import { Home, UserHome } from '@prisma/client';

const service = {

    token: async (haTokenRequest: HATokenRequest) => {
        const home = await homeService.getHomeById(haTokenRequest.home.id);

        let owner = home.user_homes.find(userHome => userHome.is_owner);
        if (!owner) throw new Error('Nhà hiện chưa có chủ!');

        let authorizationCodeResponse: HATokenResponse;
        if (owner.access_token == null) {
            return authorizationCodeResponse = await authorization_code(home, owner);
        } else {
            // Check valid access token
            if (owner.expired_at! < new Date()) {
                if (owner.refresh_token != null) {
                    return await refresh_token(home, owner);
                }
            } else {
                return {
                    access_token: owner.access_token,
                    // expires_in: 1800,
                    // token_type: 'Bearer',
                }
            }

        }
    },

}

const authorization_code = async (home: Home, owner: UserHome): Promise<HATokenResponse> => {
    const client_id = 'https://dns.3tc.vn';

    // Send request login flow to get flow_id
    const urlLoginFlow = `${home.wan_domain}/auth/login_flow`
    const flowBodyRequest = { 'client_id': client_id, 'handler': ['homeassistant', null], 'redirect_uri': 'https://dns.3tc.vn' }

    const loginFlowResponse = await axios.post(urlLoginFlow, flowBodyRequest)
        .then((response: any) => {
            return response.data;
        }).catch((error: any) => {
            console.log(error.response);
        })


    // Then have flow_id continue to get code 
    const urlGetCode = `${home.wan_domain}/auth/login_flow/${loginFlowResponse.flow_id}`

    const codeBodyRequest = {
        'client_id': 'https://dns.3tc.vn',
        'username': owner.ha_username,
        'password': owner.ha_password,
    }

    const getCodeResponse = await axios.post(urlGetCode, codeBodyRequest)
        .then((response: any) => {
            return response.data;
        }).catch((error: any) => {
            console.log(error.response);
        })
    const code = getCodeResponse.result;

    // Continue get token by code retrieved from ha server and return the response
    const urlGetToken = `${home.wan_domain}/auth/token`
    const tokenBodyRequest = {
        'grant_type': GrantType.AuthorizationCode,
        'code': code,
        'client_id': client_id,
    }

    const headersToken = {
        'Referer': `http://${home.wan_domain}:${home.wan_port}/auth/authorize?client_id=https://google.com&redirect_uri=https://google.com&response_type=code&auth_callback=1`,
        'Origin': `http://${home.wan_domain}:${home.wan_port}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    const getTokenResponse: HATokenResponse = await axios.post(urlGetToken, tokenBodyRequest, {
        headers: headersToken
    })
        .then((response: any) => {
            return response.data;
        }).catch((error: any) => {
            console.log(error.response.data);
        })


    // Save token into owner (user home)

    if (getTokenResponse.access_token) owner.access_token = getTokenResponse.access_token
    if (getTokenResponse.refresh_token) owner.refresh_token = getTokenResponse.refresh_token
    if (getTokenResponse.expires_in) owner.expired_at = new Date(Date.now() + getTokenResponse.expires_in * 1000)

    await UserHomeRepository.save(owner);

    return getTokenResponse;
}

const refresh_token = async (home: Home, owner: UserHome): Promise<HARefreshTokenResponse> => {
    const client_id = 'https://dns.3tc.vn';

    const urlGetToken = `${home.wan_domain}/auth/token`
    const tokenBodyRequest = {
        'grant_type': GrantType.RefreshToken,
        'refresh_token': owner.refresh_token,
        'client_id': client_id,
    }

    const headersToken = {
        'Referer': `http://${home.wan_domain}:${home.wan_port}/auth/authorize?client_id=https://google.com&redirect_uri=https://google.com&response_type=code&auth_callback=1`,
        'Origin': `http://${home.wan_domain}:${home.wan_port}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    const getTokenResponse: HARefreshTokenResponse = await axios.post(urlGetToken, tokenBodyRequest, {
        headers: headersToken
    })
        .then((response: any) => {
            return response.data;
        }).catch((error: any) => {
            console.log(error.response.data);
        })

    // Save token into owner (user home)

    if (getTokenResponse.access_token) owner.access_token = getTokenResponse.access_token
    if (getTokenResponse.expires_in) owner.expired_at = new Date(Date.now() + getTokenResponse.expires_in * 1000)

    await UserHomeRepository.save(owner);

    return getTokenResponse;
}

export default service;