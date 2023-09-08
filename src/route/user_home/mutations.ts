import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/UserHomeController";
import validator from "../../middleware/validator";
import schema from "../../schema/user_home";

const router = Router();

router.post("/create", validator(schema.userHomeCreate), asyncHandler(controller.create))
router.post("/createUserSchedule", asyncHandler(controller.createScheduleForUserHome))
router.put("/update", validator(schema.userHomeUpdate), asyncHandler(controller.update))
router.put("/updateUserSchedule", asyncHandler(controller.updateScheduleForUserHome))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
