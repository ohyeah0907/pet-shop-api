"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConstant = void 0;
exports.emailConstant = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
};
