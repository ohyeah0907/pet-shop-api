import { Router } from "express";
import controller from "../../controllers/SessionController";
import asyncHandler from "../../handler/asyncHandler";
import { BadRequestResponse, SuccessResponse } from "../../handler/app-response";
import validator from "../../middleware/validator";
import schema from "../../schema/session";

const router = Router();

router.get("/search", asyncHandler(controller.getSearch));

router.get("/:id", asyncHandler(controller.getById))

export default router;
