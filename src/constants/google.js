"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var googleConstants = {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callBackUrl: process.env.GOOGLE_CALLBACK_URL || ''
};
exports.default = googleConstants;
