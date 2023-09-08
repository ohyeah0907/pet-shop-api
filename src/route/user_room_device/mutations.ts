import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/UserRoomDeviceController";
import validator from "../../middleware/validator";
import schema from "../../schema/user_room_device";

const router = Router();

router.post("/create", validator(schema.userRoomDeviceCreate), asyncHandler(controller.create))
router.put("/update", validator(schema.userRoomDeviceUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
