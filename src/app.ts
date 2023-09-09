import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import oauth2 from "./route/oauth2";
import session from "express-session";

dotenv.config();

import router from "./route";
import bodyParser from "body-parser";
import passport from "passport";
import initialPassport from "./middleware/passport-local";
import flash from "connect-flash"
import "./web_socket"
import initPassportSocial from "./middleware/passport-social";

const PORT = process.env.PORT || 3000;
const app: Express = express();
app.use(session({
    secret: 'klhjjxcvjkxcjvcjsdfjsdljlgasgkcxvcouvopu',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: false,
    },
    resave: false,
    saveUninitialized: false,
}));
app.enable('trust proxy');

app.use((req, res, next) => {
    if (req.secure || req.headers.host?.startsWith('localhost')) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});
app.use(passport.initialize());
app.use(passport.session());
initPassportSocial();
initialPassport();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.use(cors(
    {
        origin: [
            process.env.PORTAL_URL || ''
        ]
    }
))
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/api/v2", router);
app.use("/oauth2", oauth2);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));