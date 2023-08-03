import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/HAEntityController";
import validator from "../../middleware/validator";
import schema from "../../schema/ha_entity";

const router = Router();

router.post("/create", validator(schema.haEntityCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.haEntityUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
