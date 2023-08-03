import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/FilterController";
import validator from "../../middleware/validator";
import schema from "../../schema/filter";

const router = Router();

router.post("/create", validator(schema.filterCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.filterUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
