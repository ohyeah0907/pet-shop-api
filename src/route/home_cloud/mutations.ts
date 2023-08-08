import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/HomeCloudController";
import validator from "../../middleware/validator";
import schema from "../../schema/home_cloud";

const router = Router();

router.post("/create", validator(schema.homeCloudCreate), asyncHandler(controller.createHomeCloud))
router.put("/update", validator(schema.homeCloudUpdate), asyncHandler(controller.updateHomeCloud))
router.delete("/delete/:id", asyncHandler(controller.deleteHomeCloud))

export default router;
