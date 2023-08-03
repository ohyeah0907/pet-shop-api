import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/RoomController";
import validator from "../../middleware/validator";
import schema from "../../schema/room";

const router = Router();

router.post("/create", validator(schema.roomCreate), asyncHandler(controller.create))
router.put("/update", validator(schema.roomUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
