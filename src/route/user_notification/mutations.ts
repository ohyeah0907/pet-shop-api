import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/UserNotificationController";
import validator from "../../middleware/validator";
import schema from "../../schema/user_notification";

const router = Router();

router.post("/create", validator(schema.userNotificationCreate), asyncHandler(controller.create))
router.put("/update", validator(schema.userNotificationUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
