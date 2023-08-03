import { Router } from "express";
import roleController from "../../controllers/RoleController";
import asyncHandler from "../../handler/asyncHandler";
import { BadRequestResponse, SuccessResponse } from "../../handler/app-response";
import validator from "../../middleware/validator";
import schema from "../../schema/role";

const router = Router();

router.get("/search", asyncHandler(roleController.getRoleSearch));

router.get("/:id", asyncHandler(roleController.getRoleById))

export default router;
