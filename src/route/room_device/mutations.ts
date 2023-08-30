import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/RoomDeviceController";
import validator from "../../middleware/validator";
import schema from "../../schema/room_device";

const router = Router();

router.post("/create", validator(schema.roomDeviceCreate), asyncHandler(controller.create))
router.put("/update", validator(schema.roomDeviceUpdate), asyncHandler(controller.update))
router.put("/updateDragAndDrop", asyncHandler(controller.updateDragAndDrop))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
