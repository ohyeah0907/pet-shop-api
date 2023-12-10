import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import AccessoryController from "../../controllers/AccessoryController";
import validator from "../../middleware/validator";
import schema from "../../schema/accessory";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post(
  "/create",
  validator(schema.accessoryCreate),
  asyncHandler(AccessoryController.create),
);
router.put(
  "/update",
  validator(schema.accessoryUpdate),
  asyncHandler(AccessoryController.update),
);
router.delete("/delete/:id", asyncHandler(AccessoryController.delete));

export default router;
