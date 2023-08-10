import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/OAuth2Controller";
import validator from "../../middleware/validator";
import schema from "../../schema/auth";
import authentication from "../../middleware/authentication";

const router = Router();

router.get("/login/authorize", asyncHandler(controller.authorize));
router.post("/login/access_token", asyncHandler(controller.access_token));
// router.post("/login/access_token", validator(schema.userLogin), asyncHandler(controller.login));

export default router;