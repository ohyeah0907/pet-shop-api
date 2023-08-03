import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/RoleHouseController";
import validator from "../../middleware/validator";
import schema from "../../schema/role_house";

const router = Router();

router.post("/create", validator(schema.roleHouseCreate), asyncHandler(controller.create))
router.put("/update",validator(schema.roleHouseUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
