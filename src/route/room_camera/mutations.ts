import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/RoomCameraController";
import validator from "../../middleware/validator";
import schema from "../../schema/room_camera";

const router = Router();

router.post("/create", validator(schema.roomCameraCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.roomCameraUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
