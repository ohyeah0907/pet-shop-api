import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/CloudController";
import validator from "../../middleware/validator";
import schema from "../../schema/cloud";

const router = Router();

router.post("/create", validator(schema.cloudCreate), asyncHandler(controller.createCloud))
router.put("/update", validator(schema.cloudUpdate), asyncHandler(controller.updateCloud))
router.delete("/delete/:id", asyncHandler(controller.deleteCloud))

export default router;
