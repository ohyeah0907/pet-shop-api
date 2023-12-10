"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserService_1 = require("../services/UserService");
var app_error_1 = require("../handler/app-error");
var jwt_1 = require("../core/jwt");
var token_1 = require("../helper/token");
var auth_1 = require("../schema/auth");
var asyncHandler_1 = require("../handler/asyncHandler");
var validator_1 = require("./validator");
var app_response_1 = require("../handler/app-response");
var router = express_1.default.Router();
exports.default = router.use((0, validator_1.default)(auth_1.default.auth, validator_1.ValidationSource.HEADER), (0, asyncHandler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req.accessToken = (0, token_1.getAccessToken)(req.headers.authorization); // Express headers are auto converted to lowercase
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, jwt_1.default.decode(req.accessToken)];
            case 2:
                payload = _a.sent();
                // console.log('payload :>> ', payload);
                (0, token_1.validateTokenData)(payload);
                return [4 /*yield*/, jwt_1.default.validate(req.accessToken)];
            case 3:
                _a.sent();
                return [4 /*yield*/, UserService_1.default.getUserById(parseInt(payload.sub))];
            case 4:
                user = _a.sent();
                if (!user)
                    throw new app_error_1.AuthenticationFailure("Người dùng chưa được tạo");
                req.user = user;
                // const keystore = await KeystoreRepository.findForKey(req.user, payload.prm);
                // if (!keystore) throw new AuthenticationFailure('Xác thực không thành công');
                // req.keystore = keystore;
                return [2 /*return*/, next()];
            case 5:
                e_1 = _a.sent();
                return [2 /*return*/, new app_response_1.BadRequestResponse(e_1.message).send(res)];
            case 6: return [2 /*return*/];
        }
    });
}); }));
