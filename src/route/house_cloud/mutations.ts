import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/HouseCloudController";
import validator from "../../middleware/validator";
import schema from "../../schema/house_cloud";

const router = Router();

router.post("/create", validator(schema.houseCloudCreate), asyncHandler(controller.createHouseCloud))
router.put("/update", validator(schema.houseCloudUpdate), asyncHandler(controller.updateHouseCloud))
router.delete("/delete/:id", asyncHandler(controller.deleteHouseCloud))

export default router;
