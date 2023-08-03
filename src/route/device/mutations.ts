import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/DeviceController";
import validator from "../../middleware/validator";
import schema from "../../schema/device";

const router = Router();

router.post("/create", validator(schema.deviceCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.deviceUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
