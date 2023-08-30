import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/OAuth2Controller";
import passport from "passport";
import isAuthenticated from "../../middleware/oauthentication2";

const router = Router();

router.get("/login", asyncHandler(controller.loginView));

router.get("/register", asyncHandler(controller.registerView));

router.post("/login", passport.authenticate('local', {
    session: true,
    failureRedirect: "/oauth2/login",
    failureFlash: true,
}), asyncHandler(controller.login));

router.post("/register", asyncHandler(controller.register));

router.post("/resend", asyncHandler(controller.resend));

router.get("/verify-email/:token", asyncHandler(controller.verify));

router.get("/login/authorize", isAuthenticated, asyncHandler(controller.authorize));

router.post("/login/access_token", asyncHandler(controller.access_token));

export default router;