import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/ScheduleWeekController";
import validator from "../../middleware/validator";
import schema from "../../schema/schedule_week";

const router = Router();

router.post("/create", validator(schema.scheduleWeekCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.scheduleWeekUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
