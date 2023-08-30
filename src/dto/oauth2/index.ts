

export type CredentialLogin = {
    username: string,
    password: string,
    client_id: string,
    redirect_uri: string,
    state: string,
    scope: string,
    response_type: string,
}
export type AuthorizeCodeLogin = {
    client_id: string,
    redirect_uri: string,
    state: string,
    scope: string,
    response_type: string,
    user_id?: number,
}

export type AuthorizeCodeLoginResponse = {
    code: string,
    state: string,
}

export type AccessTokenLogin = {
    client_id: string,
    client_secret: string,
    redirect_uri: string,
    grant_type: string,
    code: string,
    refresh_token: string,
}

export type AccessTokenResponse = {
    access_token: string,
    token_type: string,
    expires_in: number,
    refresh_token: string,
}

export type AuthRegister = {
    email: string,
    password: string,
}

export type AuthLogin = {
    email: string,
    password: string,
}

export type AuthResend = {
    email: string,
}