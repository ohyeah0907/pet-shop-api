import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/SessionController";
import validator from "../../middleware/validator";
import schema from "../../schema/session";

const router = Router();

router.post("/create", validator(schema.sessionCreate), asyncHandler(controller.create))
router.put("/update", validator(schema.sessionUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;