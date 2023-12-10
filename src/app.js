"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var express_session_1 = require("express-session");
dotenv_1.default.config();
var route_1 = require("./route");
var passport_1 = require("passport");
var passport_local_1 = require("./middleware/passport-local");
var connect_flash_1 = require("connect-flash");
require("./web_socket");
var passport_social_1 = require("./middleware/passport-social");
var PORT = process.env.PORT || 3000;
var app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'klhjjxcvjkxcjvcjsdfjsdljlgasgkcxvcouvopu',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: false,
    },
    resave: false,
    saveUninitialized: false,
}));
app.enable('trust proxy');
app.use(function (req, res, next) {
    var _a;
    if (req.secure || ((_a = req.headers.host) === null || _a === void 0 ? void 0 : _a.startsWith('localhost'))) {
        next();
    }
    else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_social_1.default)();
(0, passport_local_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, connect_flash_1.default)());
var portalUrl = process.env.PORTAL_URL || '';
app.use((0, cors_1.default)(
// {
//     origin: [
//         portalUrl,
//         "http://localhost:4003",
//     ],
//     optionsSuccessStatus: 200,
//     credentials: true,
// }
));
app.use(express_1.default.static("public"));
app.set("view engine", "ejs");
app.use("/api", route_1.default);
app.listen(PORT, function () { return console.log("Running on ".concat(PORT, " \u26A1")); });
