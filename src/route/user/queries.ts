import { Router } from "express";
import controller from "../../controllers/UserController";
import asyncHandler from "../../handler/asyncHandler";
import { BadRequestResponse, SuccessResponse } from "../../handler/app-response";
import validator from "../../middleware/validator";
import schema from "../../schema/role";

const router = Router();

router.get("/search", asyncHandler(controller.getUserSearch));

router.get("/:id", asyncHandler(controller.getUserById))

export default router;
