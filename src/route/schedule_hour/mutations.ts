import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/ScheduleHourController";
import validator from "../../middleware/validator";
import schema from "../../schema/schedule_hour";

const router = Router();

router.post("/create", validator(schema.scheduleHourCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.scheduleHourUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
