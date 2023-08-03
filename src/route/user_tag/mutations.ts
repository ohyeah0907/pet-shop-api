import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/UserTagController";
import validator from "../../middleware/validator";
import schema from "../../schema/user_tag";

const router = Router();

router.post("/create", validator(schema.userTagCreate), asyncHandler(controller.create))
router.put("/update", validator(schema.userTagUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
