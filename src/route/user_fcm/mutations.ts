import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/UserFCMController";
import validator from "../../middleware/validator";
import schema from "../../schema/user_fcm";

const router = Router();

router.post("/create", validator(schema.userFCMCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.userFCMUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
