import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/VoiceProjectController";
import validator from "../../middleware/validator";
import schema from "../../schema/voice_project";

const router = Router();

router.post("/create", validator(schema.voiceProjectCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.voiceProjectUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
