import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/UserScheduleController";
import validator from "../../middleware/validator";
import schema from "../../schema/user_schedule";

const router = Router();

router.post("/create", validator(schema.userScheduleCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.userScheduleUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
