"use strict";
// import SMTPTransport from "nodemailer/lib/smtp-transport";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = exports.redis = exports.logDirectory = exports.corsOrigin = exports.timezone = exports.port = exports.environment = void 0;
// General configuration
exports.environment = process.env.NODE_ENV;
exports.port = process.env.PORT;
exports.timezone = process.env.TIMEZONE;
// Cors configuration
exports.corsOrigin = process.env.CORS_ORIGIN;
// Logging configuration
exports.logDirectory = process.env.LOG_DIR;
// Redis configuration
exports.redis = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    pass: process.env.REDIS_PASS
};
// Cache configuration
exports.cache = {
    contentCacheDuration: parseInt(process.env.CONTENT_CACHE_DURATION || '600000'),
};
// Email configuration
// export const emailConfig = {
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: process.env.EMAIL_SECURE,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   }
// } as SMTPTransport.Options;
