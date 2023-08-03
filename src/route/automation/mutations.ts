import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/AutomationController";
import validator from "../../middleware/validator";
import schema from "../../schema/automation";

const router = Router();

router.post("/create", validator(schema.automationCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.automationUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
