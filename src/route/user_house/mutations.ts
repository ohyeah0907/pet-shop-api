import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/UserHouseController";
import validator from "../../middleware/validator";
import schema from "../../schema/user_house";

const router = Router();

router.post("/create", validator(schema.userHouseCreate), asyncHandler(controller.create))
router.put("/update", validator(schema.userHouseUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
