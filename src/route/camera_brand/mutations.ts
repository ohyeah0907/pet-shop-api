import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/CameraBrandController";
import validator from "../../middleware/validator";
import schema from "../../schema/camera_brand";

const router = Router();

router.post("/create", validator(schema.cameraBrandCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.cameraBrandUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
