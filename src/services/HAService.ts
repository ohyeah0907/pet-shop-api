import { codeConstants, tokenConstants } from '../constants';
import { AccessTokenLogin, AuthLogin, AuthRegister, AuthResend, AuthorizeCodeLogin, AuthorizeCodeLoginResponse, CredentialLogin } from '../dto/oauth2';
import { encrypt, decrypt } from '../helper/code';
import voiceProjectService from './VoiceProjectService';
import UserRepository from '../repositories/UserRepository';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { HARefreshTokenResponse, HASyncRequest, HATokenRequest, HATokenResponse } from '../dto/ha';
import homeService from '../services/HomeService'
import UserHomeRepository from '../repositories/UserHomeRepository'
import axios from 'axios'
import { GrantType } from '../constants/enum';
import authorization from '../middleware/authorization';
import { DeviceTypeCode, Home, UserHome } from '@prisma/client';
import deviceTypeService from '../services/DeviceTypeService'
import automationService from '../services/AutomationService'
import scriptService from '../services/ScriptService'
import haEntityService from '../services/HAEntityService';
import deviceService from '../services/DeviceService';
import { DeviceCreate } from '../dto/device';
import prisma from '../prisma';
import { HAEntityCreate } from '../dto/ha_entity';
import { ScriptCreate } from '../dto/script';
import { AutomationCreate } from '../dto/automation';

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
    syncDevicefromHAServer: async (syncRequest: HASyncRequest) => {
        return await prisma.$transaction(async () => {
            const home = await homeService.getHomeById(syncRequest.home.id);

            let owner = home.user_homes.find(userHome => userHome.is_owner);
            if (!owner) throw new Error('Nhà hiện chưa có chủ!');

            let accessToken: string | null = owner.access_token;
            if (accessToken == null) {
                const authorizationCodeResponse: HATokenResponse = await authorization_code(home, owner);
                accessToken = authorizationCodeResponse.access_token;
            } else {
                // Check valid access token
                if (owner.expired_at! < new Date()) {
                    const refreshToken = await refresh_token(home, owner);
                    accessToken = refreshToken.access_token
                } else {
                    accessToken = owner.access_token
                }
            }

            const syncDeviceUrl = `${home.wan_domain}/api/states`;
            const headers = {
                'Authorization': `Bearer ${owner.access_token}`
            }
            const getStates = await axios.get(syncDeviceUrl, {
                headers: headers
            })
                .then((response: any) => {
                    return response.data;
                }).catch((error: any) => {
                    console.log(error.response.data);
                })
            
            await Promise.all(
                getStates.map(async (state: any) => {
                    const entity_id = state.entity_id;
                    const domain: DeviceTypeCode = entity_id.substring(0, entity_id.indexOf('.'))
    
                    if (Object.values(DeviceTypeCode).includes(domain)) {
                        let haEntity: any = null;
    
                        try {
                            haEntity = await haEntityService.getByEntityId(entity_id);
                        } catch (error) {
                            const haEntityCreate: HAEntityCreate = {
                                name: state.attributes.friendly_name,
                                entity_id: entity_id,
                                home: home,
                                description: state.attributes.friendly_name,
                                accessed_at: new Date(state.attributes.last_triggered || state.last_updated)
                            }
    
                            haEntity = await haEntityService.create(haEntityCreate)
                        }
    
                        switch (domain) {
                            case DeviceTypeCode.script:
                                let script: any = null
    
                                try {
                                    script = await scriptService.getByHomeIdAndId(home.id, entity_id);
                                } catch (error) {
                                    const scriptCreate: ScriptCreate = {
                                        home: home,
                                        ha_entity: haEntity,
                                        accessed_at: new Date(state.attributes.last_triggered || state.last_updated),
                                        name: state.attributes.friendly_name,
                                        description: state.attributes.friendly_name,
                                    }
    
                                    await scriptService.create(scriptCreate);
                                }
                                break;
                            case DeviceTypeCode.scene:
                                let automation: any = null
    
                                try {
                                    automation = await automationService.getByHomeIdAndEntityId(home.id, entity_id);
                                } catch (error) {
                                    const automationCreate: AutomationCreate = {
                                        home: home,
                                        ha_entity: haEntity,
                                        accessed_at: new Date(state.attributes.last_triggered || state.last_updated),
                                        name: state.attributes.friendly_name,
                                        description: state.attributes.friendly_name,
                                    }
    
                                    await automationService.create(automationCreate);
                                }
                                break;
                            default:
                                let device: any = null;
                                const deviceType = await deviceTypeService.getByCode(domain)
    
                                try {
                                    device = await deviceService.getByHomeIdAndEntityId(home.id, entity_id);
                                } catch (error) {
                                    const deviceCreate: DeviceCreate = {
                                        home: home,
                                        ha_entity: haEntity,
                                        type: deviceType,
                                        name: state.attributes.friendly_name,
                                        description: state.attributes.friendly_name,
                                        preset: null,
                                        sub_type: state.attributes.friendly_name,
                                        attributes: JSON.stringify(state.attributes),
                                    }
    
                                    await deviceService.create(deviceCreate);
                                }
                                break;
                        }
                    }
                })
            )
            return true;
        })
    }

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