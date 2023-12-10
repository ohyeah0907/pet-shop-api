import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import AccessoryTypeController from "../../controllers/AccessoryTypeController";
import validator from "../../middleware/validator";
import schema from "../../schema/accessory_type";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post(
  "/create",
  validator(schema.accessoryTypeCreate),
  asyncHandler(AccessoryTypeController.create),
);
router.put(
  "/update",
  validator(schema.accessoryTypeUpdate),
  asyncHandler(AccessoryTypeController.update),
);
router.delete("/delete/:id", asyncHandler(AccessoryTypeController.delete));

export default router;
