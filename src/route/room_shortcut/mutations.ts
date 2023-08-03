import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/RoomShortcutController";
import validator from "../../middleware/validator";
import schema from "../../schema/room_shortcut";

const router = Router();

router.post("/create", validator(schema.roomShortcutCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.roomShortcutUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
