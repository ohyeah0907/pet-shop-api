import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/RoleScheduleController";
import validator from "../../middleware/validator";
import schema from "../../schema/role_schedule";

const router = Router();

router.post("/create", validator(schema.roleScheduleCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.roleScheduleUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
