import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/AuthController";
import validator from "../../middleware/validator";
import schema from "../../schema/auth";
import authentication from "../../middleware/authentication";
import refreshToken from "../../middleware/refresh-token";
import passport from "passport";

const router = Router();

router.get("/info", authentication, asyncHandler(controller.info));
router.post("/login", validator(schema.userLogin), asyncHandler(controller.login));
router.post("/register", validator(schema.userRegister), asyncHandler(controller.register));
router.post("/resend", validator(schema.userResend), asyncHandler(controller.resend));
router.get("/verify-email/:token", asyncHandler(controller.verify));
router.delete("/logout", authentication, asyncHandler(controller.logout));
router.post("/refresh-token", validator(schema.refreshToken), refreshToken, asyncHandler(controller.refreshToken))

router.get("/signin/google", asyncHandler(async (req, res, next) => {
    req.session.authorize = req.query
    next();
}), passport.authenticate('google', {
    scope: ['profile', 'email', 'openid',]
}));


router.get('/google/callback', passport.authenticate('google', {
    session: true,
    failureRedirect: '/auth/login'
}), asyncHandler(controller.signInWithGoogle));

export default router;