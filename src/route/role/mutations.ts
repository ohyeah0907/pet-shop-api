import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import roleController from "../../controllers/RoleController";
import { SuccessResponse } from "../../handler/app-response";
import validator from "../../middleware/validator";
import schema from "../../schema/role";

const router = Router();

router.post("/create", validator(schema.roleCreate), asyncHandler(roleController.createRole))
router.put("/update",validator(schema.roleUpdate), asyncHandler(roleController.updateRole))
router.delete("/delete/:id", asyncHandler(roleController.deleteRole))

export default router;
