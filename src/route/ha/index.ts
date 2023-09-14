import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/HAController";
import passport from "passport";
import isAuthenticated from "../../middleware/oauthentication2";

const router = Router();


router.post("/token", asyncHandler(controller.token));


export default router;