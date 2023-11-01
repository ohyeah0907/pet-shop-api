import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/AuthController";
import validator from "../../middleware/validator";
import schema from "../../schema/auth";
import authentication from "../../middleware/authentication";

const router = Router();

router.get("/info", authentication, asyncHandler(controller.info));
router.post("/login", validator(schema.userLogin), asyncHandler(controller.login));
router.post("/register", validator(schema.userRegister), asyncHandler(controller.register));
router.post("/resend", validator(schema.userResend), asyncHandler(controller.resend));
router.get("/verify-email/:token", asyncHandler(controller.verify));
router.delete("/logout", authentication, asyncHandler(controller.logout));
router.get("/refresh-token", asyncHandler(controller.refreshToken))

export default router;