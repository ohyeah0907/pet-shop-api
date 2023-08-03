import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/TagController";
import validator from "../../middleware/validator";
import schema from "../../schema/tag";

const router = Router();

router.post("/create", validator(schema.tagCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.tagUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
