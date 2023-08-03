import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/ActionableController";
import validator from "../../middleware/validator";
import schema from "../../schema/actionable";

const router = Router();

router.post("/create", validator(schema.actionableCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.actionableUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
