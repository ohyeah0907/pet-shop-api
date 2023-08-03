import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/RoleDeviceController";
import { SuccessResponse } from "../../handler/app-response";
import validator from "../../middleware/validator";
import schema from "../../schema/role_device";

const router = Router();

router.post("/create", validator(schema.roleDeviceCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.roleDeviceUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
