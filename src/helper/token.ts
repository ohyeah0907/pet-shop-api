import { Tokens } from '../types/app-request';
import { AuthenticationFailure, InternalServerError } from '../handler/app-error';
import JWT, { JwtPayload } from '../core/jwt';
import { tokenConfig } from '../config/token';
import { User } from '@prisma/client';

export const getAccessToken = (authorization?: string) => {
    if (!authorization) throw new AuthenticationFailure('Invalid Authorization');
    if (!authorization.startsWith('Bearer '))
        throw new AuthenticationFailure('Invalid Authorization');
    return authorization.split(' ')[1];
};

export const validateTokenData = (payload: JwtPayload): boolean => {
    if (
        !payload ||
        !payload.iss ||
        !payload.sub ||
        !payload.aud ||
        !payload.prm ||
        payload.iss !== tokenConfig.issuer ||
        payload.aud !== tokenConfig.audience ||
        !payload.sub
    )
        throw new AuthenticationFailure('Invalid Access Token');
    return true;
};

export const createTokens = async (
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
): Promise<Tokens> => {
    const accessToken = await JWT.encode(
        new JwtPayload(
            tokenConfig.issuer,
            tokenConfig.audience,
            user.id.toString(),
            accessTokenKey,
            tokenConfig.accessTokenValidity,
        ),
    );

    if (!accessToken) throw new InternalServerError();

    return {
        accessToken: accessToken,
        refreshToken: refreshTokenKey,
    } as Tokens;
};

export const createAccessToken = async (
    userId: number,
    accessTokenKey: string,
): Promise<string> => {
    const accessToken = await JWT.encode(
        new JwtPayload(
            tokenConfig.issuer,
            tokenConfig.audience,
            userId.toString(),
            accessTokenKey,
            tokenConfig.accessTokenValidity,
        ),
    );

    if (!accessToken) throw new InternalServerError();


    return accessToken;
};