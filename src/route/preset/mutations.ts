import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/PresetController";
import validator from "../../middleware/validator";
import schema from "../../schema/preset";

const router = Router();

router.post("/create", validator(schema.presetCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.presetUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
