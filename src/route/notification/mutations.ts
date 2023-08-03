import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/NotificationController";
import validator from "../../middleware/validator";
import schema from "../../schema/notification";

const router = Router();

router.post("/create", validator(schema.notificationCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.notificationUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
