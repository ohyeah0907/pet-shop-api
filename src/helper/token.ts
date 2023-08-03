import { Tokens } from '../types/app-request';
import { AuthenticationFailure, InternalServerError } from '../handler/app-error';
import JWT, { JwtPayload } from '../core/jwt';
import { token } from '../config/token';
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
        payload.iss !== token.issuer ||
        payload.aud !== token.audience ||
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
            token.issuer,
            token.audience,
            user.id.toString(),
            accessTokenKey,
            token.accessTokenValidity,
        ),
    );

    if (!accessToken) throw new InternalServerError();

    const refreshToken = await JWT.encode(
        new JwtPayload(
            token.issuer,
            token.audience,
            user.id.toString(),
            refreshTokenKey,
            token.refreshTokenValidity,
        ),
    );

    if (!refreshToken) throw new InternalServerError();

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    } as Tokens;
};