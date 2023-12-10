"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExpired = exports.InvalidAccessToken = exports.AuthenticationFailure = exports.Forbidden = exports.BadRequest = exports.NoEntry = exports.NoDataAvailable = exports.NotFound = exports.InternalServerError = exports.AppError = exports.ErrorType = void 0;
var app_1 = require("../config/app");
var app_response_1 = require("./app-response");
var ErrorType;
(function (ErrorType) {
    ErrorType["TOKEN_EXPIRED"] = "TokenExpired";
    ErrorType["UNAUTHORIZED"] = "Unauthorized";
    ErrorType["INVALID_ACCESS_TOKEN"] = "InvalidAccessToken";
    ErrorType["FORBIDDEN"] = "Forbidden";
    ErrorType["INTERNAL_SERVER_ERROR"] = "InternalServerError";
    ErrorType["BAD_REQUEST"] = "BadRequest";
    ErrorType["NOT_FOUND"] = "NotFound";
    ErrorType["NO_DATA_AVAILABLE"] = "NoDataAvailable";
    ErrorType["NO_ENTRY"] = "NoEntry";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(type, message) {
        var _this = _super.call(this, type) || this;
        _this.type = type;
        _this.message = message;
        return _this;
    }
    AppError.handle = function (error, res) {
        switch (error.type) {
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.UNAUTHORIZED:
                return new app_response_1.AuthFailureResponse(error.message).send(res);
            case ErrorType.INVALID_ACCESS_TOKEN:
                return new app_response_1.AccessTokenErrorResponse(error.message).send(res);
            case ErrorType.INTERNAL_SERVER_ERROR:
                return new app_response_1.InternalServerErrorResponse(error.message).send(res);
            case ErrorType.NOT_FOUND:
            case ErrorType.NO_DATA_AVAILABLE:
            case ErrorType.NO_ENTRY:
                return new app_response_1.NotFoundResponse(error.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new app_response_1.BadRequestResponse(error.message).send(res);
            case ErrorType.FORBIDDEN:
                return new app_response_1.ForbiddenResponse(error.message).send(res);
            default: {
                var message = error.message;
                if (app_1.environment === 'production')
                    message = 'Internal Server Error';
                return new app_response_1.InternalServerErrorResponse(message).send(res);
            }
        }
    };
    return AppError;
}(Error));
exports.AppError = AppError;
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message) {
        if (message === void 0) { message = 'Internal server error'; }
        return _super.call(this, ErrorType.INTERNAL_SERVER_ERROR, message) || this;
    }
    return InternalServerError;
}(AppError));
exports.InternalServerError = InternalServerError;
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound(message) {
        if (message === void 0) { message = 'Not found'; }
        return _super.call(this, ErrorType.NOT_FOUND, message) || this;
    }
    return NotFound;
}(AppError));
exports.NotFound = NotFound;
var NoDataAvailable = /** @class */ (function (_super) {
    __extends(NoDataAvailable, _super);
    function NoDataAvailable(message) {
        if (message === void 0) { message = 'No data available'; }
        return _super.call(this, ErrorType.NO_DATA_AVAILABLE, message) || this;
    }
    return NoDataAvailable;
}(AppError));
exports.NoDataAvailable = NoDataAvailable;
var NoEntry = /** @class */ (function (_super) {
    __extends(NoEntry, _super);
    function NoEntry(message) {
        if (message === void 0) { message = 'Entry was not found'; }
        return _super.call(this, ErrorType.NO_ENTRY, message) || this;
    }
    return NoEntry;
}(AppError));
exports.NoEntry = NoEntry;
var BadRequest = /** @class */ (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest(message) {
        if (message === void 0) { message = 'Bad request'; }
        return _super.call(this, ErrorType.BAD_REQUEST, message) || this;
    }
    return BadRequest;
}(AppError));
exports.BadRequest = BadRequest;
var Forbidden = /** @class */ (function (_super) {
    __extends(Forbidden, _super);
    function Forbidden(message) {
        if (message === void 0) { message = 'Permission denied'; }
        return _super.call(this, ErrorType.FORBIDDEN, message) || this;
    }
    return Forbidden;
}(AppError));
exports.Forbidden = Forbidden;
var AuthenticationFailure = /** @class */ (function (_super) {
    __extends(AuthenticationFailure, _super);
    function AuthenticationFailure(message) {
        if (message === void 0) { message = 'Authentication failed'; }
        return _super.call(this, ErrorType.UNAUTHORIZED, message) || this;
    }
    return AuthenticationFailure;
}(AppError));
exports.AuthenticationFailure = AuthenticationFailure;
var InvalidAccessToken = /** @class */ (function (_super) {
    __extends(InvalidAccessToken, _super);
    function InvalidAccessToken(message) {
        if (message === void 0) { message = 'Invalid access token'; }
        return _super.call(this, ErrorType.INVALID_ACCESS_TOKEN, message) || this;
    }
    return InvalidAccessToken;
}(AppError));
exports.InvalidAccessToken = InvalidAccessToken;
var TokenExpired = /** @class */ (function (_super) {
    __extends(TokenExpired, _super);
    function TokenExpired(message) {
        if (message === void 0) { message = 'Token expired'; }
        return _super.call(this, ErrorType.TOKEN_EXPIRED, message) || this;
    }
    return TokenExpired;
}(AppError));
exports.TokenExpired = TokenExpired;
