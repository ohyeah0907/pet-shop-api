import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import accessoryController from "../../controllers/AccessoryController";
import validator from "../../middleware/validator";
import schema from "../../schema/accessory";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post("/create", validator(schema.accessoryCreate), asyncHandler(accessoryController.create))
router.put("/update", validator(schema.accessoryUpdate), asyncHandler(accessoryController.update))
router.delete("/delete/:id", asyncHandler(accessoryController.delete))

export default router;
