import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/LanguageController";
import validator from "../../middleware/validator";
import schema from "../../schema/language";

const router = Router();

router.post("/create", validator(schema.languageCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.languageUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
