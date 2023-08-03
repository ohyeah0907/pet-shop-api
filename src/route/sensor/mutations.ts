import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/SensorController";
import validator from "../../middleware/validator";
import schema from "../../schema/sensor";

const router = Router();

router.post("/create", validator(schema.sensorCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.sensorUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
