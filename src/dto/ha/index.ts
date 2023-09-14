import { Home } from "@prisma/client";
import { GrantType } from "../../constants/enum";

export type HATokenRequest = {
    home: Home;
    grant_type: GrantType,
}

export type HATokenResponse = {
    access_token: string,
    token_type: string,
    refresh_token: string,
    expires_in: number,
    ha_auth_provider: string
}

export type HARefreshTokenResponse = {
    access_token: string,
    token_type: string,
    expires_in: number,
}