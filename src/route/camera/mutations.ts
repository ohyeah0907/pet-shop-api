import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/CameraController";
import validator from "../../middleware/validator";
import schema from "../../schema/camera";

const router = Router();

router.post("/create", validator(schema.cameraCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.cameraUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
