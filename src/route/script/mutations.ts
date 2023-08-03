import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/ScriptController";
import validator from "../../middleware/validator";
import schema from "../../schema/script";

const router = Router();

router.post("/create", validator(schema.scriptCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.scriptUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
