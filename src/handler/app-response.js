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
exports.TokenRefreshResponse = exports.AccessTokenErrorResponse = exports.SuccessResponse = exports.FailureMsgResponse = exports.SuccessMsgResponse = exports.InternalServerErrorResponse = exports.BadRequestResponse = exports.ForbiddenResponse = exports.NotFoundResponse = exports.AuthFailureResponse = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["FAILURE"] = 1] = "FAILURE";
    ErrorCode[ErrorCode["RETRY"] = 2] = "RETRY";
    ErrorCode[ErrorCode["INVALID_ACCESS_TOKEN"] = 3] = "INVALID_ACCESS_TOKEN";
})(ErrorCode || (ErrorCode = {}));
var ResponseStatusCode;
(function (ResponseStatusCode) {
    ResponseStatusCode[ResponseStatusCode["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatusCode[ResponseStatusCode["BAD_REQUEST"] = 200] = "BAD_REQUEST";
    ResponseStatusCode[ResponseStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatusCode[ResponseStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatusCode[ResponseStatusCode["NOT_FOUND"] = 200] = "NOT_FOUND";
    ResponseStatusCode[ResponseStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(ResponseStatusCode || (ResponseStatusCode = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["SUCCESS"] = "Success!";
    ResponseStatus["FAILURE"] = "Failure!";
    ResponseStatus["RETRY"] = "Retry!";
    ResponseStatus["BAD_REQUEST"] = "Bad Request!";
    ResponseStatus["UNAUTHORIZED"] = "Unauthorized!";
    ResponseStatus["FORBIDDEN"] = "Forbidden!";
    ResponseStatus["NOT_FOUND"] = "Not Found!";
    ResponseStatus["INTERNAL_SERVER_ERROR"] = "Internal Server Error!";
})(ResponseStatus || (ResponseStatus = {}));
var AppResponse = /** @class */ (function () {
    function AppResponse(success, errorCode, status, statusCode, message, timestamp, data) {
        this.success = success;
        this.errorCode = errorCode;
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
        this.timestamp = timestamp;
        this.data = data;
    }
    AppResponse.prototype.prepare = function (res, response, headers) {
        for (var _i = 0, _a = Object.entries(headers); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            res.append(key, value);
        }
        return res.status(this.statusCode).json(AppResponse.sanitize(response));
    };
    AppResponse.prototype.send = function (res, headers) {
        if (headers === void 0) { headers = {}; }
        return this.prepare(res, this, headers);
    };
    AppResponse.sanitize = function (response) {
        var clone = Object.assign({}, response);
        return clone;
    };
    return AppResponse;
}());
var AuthFailureResponse = /** @class */ (function (_super) {
    __extends(AuthFailureResponse, _super);
    function AuthFailureResponse(message) {
        if (message === void 0) { message = 'Authentication failed'; }
        return _super.call(this, false, ErrorCode.FAILURE, ResponseStatus.FAILURE, ResponseStatusCode.UNAUTHORIZED, message, new Date(), null) || this;
    }
    AuthFailureResponse.prototype.send = function (res, headers) {
        if (headers === void 0) { headers = {}; }
        return this.prepare(res, this, headers);
    };
    return AuthFailureResponse;
}(AppResponse));
exports.AuthFailureResponse = AuthFailureResponse;
var NotFoundResponse = /** @class */ (function (_super) {
    __extends(NotFoundResponse, _super);
    function NotFoundResponse(message) {
        if (message === void 0) { message = 'Not found'; }
        return _super.call(this, false, ErrorCode.FAILURE, ResponseStatus.NOT_FOUND, ResponseStatusCode.NOT_FOUND, message, new Date(), null) || this;
    }
    NotFoundResponse.prototype.send = function (res, headers) {
        if (headers === void 0) { headers = {}; }
        return this.prepare(res, this, headers);
    };
    return NotFoundResponse;
}(AppResponse));
exports.NotFoundResponse = NotFoundResponse;
var ForbiddenResponse = /** @class */ (function (_super) {
    __extends(ForbiddenResponse, _super);
    function ForbiddenResponse(message) {
        if (message === void 0) { message = 'Forbidden'; }
        return _super.call(this, false, ErrorCode.FAILURE, ResponseStatus.FORBIDDEN, ResponseStatusCode.FORBIDDEN, message, new Date(), null) || this;
    }
    ForbiddenResponse.prototype.send = function (res, headers) {
        if (headers === void 0) { headers = {}; }
        return this.prepare(res, this, headers);
    };
    return ForbiddenResponse;
}(AppResponse));
exports.ForbiddenResponse = ForbiddenResponse;
var BadRequestResponse = /** @class */ (function (_super) {
    __extends(BadRequestResponse, _super);
    function BadRequestResponse(message) {
        if (message === void 0) { message = 'Bad request'; }
        return _super.call(this, false, ErrorCode.FAILURE, ResponseStatus.BAD_REQUEST, ResponseStatusCode.BAD_REQUEST, message, new Date(), null) || this;
    }
    BadRequestResponse.prototype.send = function (res, headers) {
        if (headers === void 0) { headers = {}; }
        return this.prepare(res, this, headers);
    };
    return BadRequestResponse;
}(AppResponse));
exports.BadRequestResponse = BadRequestResponse;
var InternalServerErrorResponse = /** @class */ (function (_super) {
    __extends(InternalServerErrorResponse, _super);
    function InternalServerErrorResponse(message) {
        if (message === void 0) { message = 'Internal server error'; }
        return _super.call(this, false, ErrorCode.FAILURE, ResponseStatus.INTERNAL_SERVER_ERROR, ResponseStatusCode.INTERNAL_SERVER_ERROR, message, new Date(), null) || this;
    }
    InternalServerErrorResponse.prototype.send = function (res, headers) {
        if (headers === void 0) { headers = {}; }
        return this.prepare(res, this, headers);
    };
    return InternalServerErrorResponse;
}(AppResponse));
exports.InternalServerErrorResponse = InternalServerErrorResponse;
var SuccessMsgResponse = /** @class */ (function (_super) {
    __extends(SuccessMsgResponse, _super);
    function SuccessMsgResponse(message) {
        return _super.call(this, false, ErrorCode.SUCCESS, ResponseStatus.SUCCESS, ResponseStatusCode.SUCCESS, message, new Date(), null) || this;
    }
    return SuccessMsgResponse;
}(AppResponse));
exports.SuccessMsgResponse = SuccessMsgResponse;
var FailureMsgResponse = /** @class */ (function (_super) {
    __extends(FailureMsgResponse, _super);
    function FailureMsgResponse(message) {
        return _super.call(this, false, ErrorCode.FAILURE, ResponseStatus.FAILURE, ResponseStatusCode.SUCCESS, message, new Date(), null) || this;
    }
    return FailureMsgResponse;
}(AppResponse));
exports.FailureMsgResponse = FailureMsgResponse;
var SuccessResponse = /** @class */ (function (_super) {
    __extends(SuccessResponse, _super);
    function SuccessResponse(message, data) {
        return _super.call(this, true, ErrorCode.SUCCESS, ResponseStatus.SUCCESS, ResponseStatusCode.SUCCESS, message, new Date(), data) || this;
    }
    SuccessResponse.prototype.send = function (res, headers) {
        if (headers === void 0) { headers = {}; }
        return this.prepare(res, this, headers);
    };
    return SuccessResponse;
}(AppResponse));
exports.SuccessResponse = SuccessResponse;
var AccessTokenErrorResponse = /** @class */ (function (_super) {
    __extends(AccessTokenErrorResponse, _super);
    function AccessTokenErrorResponse(message) {
        if (message === void 0) { message = 'Invalid access token'; }
        var _this = _super.call(this, false, ErrorCode.INVALID_ACCESS_TOKEN, ResponseStatus.FAILURE, ResponseStatusCode.UNAUTHORIZED, message, new Date(), null) || this;
        _this.instruction = 'refresh_token';
        return _this;
    }
    AccessTokenErrorResponse.prototype.send = function (res, headers) {
        if (headers === void 0) { headers = {}; }
        headers.instruction = this.instruction;
        return this.prepare(res, this, headers);
    };
    return AccessTokenErrorResponse;
}(AppResponse));
exports.AccessTokenErrorResponse = AccessTokenErrorResponse;
var TokenRefreshResponse = /** @class */ (function (_super) {
    __extends(TokenRefreshResponse, _super);
    function TokenRefreshResponse(message, accessToken, refreshToken) {
        var _this = _super.call(this, true, ErrorCode.SUCCESS, ResponseStatus.SUCCESS, ResponseStatusCode.SUCCESS, message, new Date(), null) || this;
        _this.accessToken = accessToken;
        _this.refreshToken = refreshToken;
        return _this;
    }
    TokenRefreshResponse.prototype.send = function (res, headers) {
        if (headers === void 0) { headers = {}; }
        return this.prepare(res, this, headers);
    };
    return TokenRefreshResponse;
}(AppResponse));
exports.TokenRefreshResponse = TokenRefreshResponse;
