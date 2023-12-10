"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiAuthBearer = exports.JoiUrlEndpoint = exports.ValidationSource = void 0;
var joi_1 = require("joi");
var app_response_1 = require("../handler/app-response");
var ValidationSource;
(function (ValidationSource) {
    ValidationSource["BODY"] = "body";
    ValidationSource["HEADER"] = "headers";
    ValidationSource["QUERY"] = "query";
    ValidationSource["PARAM"] = "params";
})(ValidationSource || (exports.ValidationSource = ValidationSource = {}));
var JoiUrlEndpoint = function () {
    return joi_1.default.string().custom(function (value, helpers) {
        if (value.includes("://"))
            return helpers.error("any.invalid");
        return value;
    }, "Url Endpoint Validation");
};
exports.JoiUrlEndpoint = JoiUrlEndpoint;
var JoiAuthBearer = function () {
    return joi_1.default.string().custom(function (value, helpers) {
        if (!value.startsWith("Bearer "))
            return helpers.error("any.invalid");
        if (!value.split(" ")[1])
            return helpers.error("any.invalid");
        return value;
    }, "Authorization Header Validation");
};
exports.JoiAuthBearer = JoiAuthBearer;
exports.default = (function (schema, source) {
    if (source === void 0) { source = ValidationSource.BODY; }
    return function (req, res, next) {
        try {
            // console.log("req[source] :>> ", req[source]);
            var error = schema.validate(req[source]).error;
            if (!error)
                return next();
            var details = error.details;
            var message = details
                .map(function (i) { return i.message.replace(/['"]+/g, ""); })
                .join(",");
            next(new app_response_1.BadRequestResponse(message).send(res));
        }
        catch (error) {
            next(error);
        }
    };
});
