import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/RoleHomeController";
import validator from "../../middleware/validator";
import schema from "../../schema/role_home";

const router = Router();

router.post("/create", validator(schema.roleHomeCreate), asyncHandler(controller.create))
router.post("/create-and-update", asyncHandler(controller.createAndUpdate))
router.put("/update",validator(schema.roleHomeUpdate), asyncHandler(controller.update))
router.delete("/delete/:id", asyncHandler(controller.delete))

export default router;
