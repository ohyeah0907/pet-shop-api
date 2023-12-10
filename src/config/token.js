"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenConfig = void 0;
exports.tokenConfig = {
    jwtSecret: process.env.JWT_SECRET,
    accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SECONDS || '0'),
    refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SECONDS || '0'),
    issuer: process.env.TOKEN_ISSUER || '',
    audience: process.env.TOKEN_AUDIENCE || '',
};
