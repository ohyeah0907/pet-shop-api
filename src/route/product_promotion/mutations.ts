import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import ProductPromotionController from "../../controllers/ProductPromotionController";
import validator from "../../middleware/validator";
import schema from "../../schema/product_promotion";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post(
  "/create",
  validator(schema.productPromotionCreate),
  asyncHandler(ProductPromotionController.create),
);
router.put(
  "/update",
  validator(schema.productPromotionUpdate),
  asyncHandler(ProductPromotionController.update),
);
router.delete("/delete/:id", asyncHandler(ProductPromotionController.delete));

export default router;
