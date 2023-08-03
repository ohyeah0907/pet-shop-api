import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/UserController";
import validator from "../../middleware/validator";
import schema from "../../schema/user";

const router = Router();

router.post("/create", validator(schema.userCreate), asyncHandler(controller.createUser))
router.put("/update",validator(schema.userUpdate), asyncHandler(controller.updateUser))
router.delete("/delete/:id", asyncHandler(controller.deleteUser))

export default router;
