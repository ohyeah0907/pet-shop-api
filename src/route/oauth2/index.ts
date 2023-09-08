import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/OAuth2Controller";
import passport from "passport";
import isAuthenticated from "../../middleware/oauthentication2";

const router = Router();

router.get("/register", asyncHandler(controller.registerView));

router.get("/login", asyncHandler(controller.loginView));

router.post("/login", passport.authenticate('local', {
    session: true,
    authInfo: true,
    failureFlash: true,
    failWithError: true,
}), asyncHandler(controller.login));

router.get("/login/google", asyncHandler(async (req, res, next) => {
    req.session.authorize = req.query
    next();
}), passport.authenticate('google', {
    scope: ['profile', 'email', 'openid',]
}));


router.get('/google/callback', passport.authenticate('google', {
    session: true,
    failureRedirect: '/oauth2/login'
}), asyncHandler(controller.loginGoogle));

router.post("/register", asyncHandler(controller.register));

router.post("/resend", asyncHandler(controller.resend));

router.get("/verify-email/:token", asyncHandler(controller.verify));

router.get("/login/authorize", isAuthenticated, asyncHandler(controller.authorize));

router.post("/login/access_token", asyncHandler(controller.access_token));

export default router;