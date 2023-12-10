import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import PromotionController from "../../controllers/PromotionController";
import validator from "../../middleware/validator";
import schema from "../../schema/promotion";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post(
  "/create",
  validator(schema.promotionCreate),
  asyncHandler(PromotionController.create),
);
router.put(
  "/update",
  validator(schema.promotionUpdate),
  asyncHandler(PromotionController.update),
);
router.delete("/delete/:id", asyncHandler(PromotionController.delete));

export default router;
