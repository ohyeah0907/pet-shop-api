import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import ProductFeedbackController from "../../controllers/ProductFeedbackController";
import validator from "../../middleware/validator";
import schema from "../../schema/product_feedback";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post(
  "/create",
  validator(schema.producFeedbackCreate),
  asyncHandler(ProductFeedbackController.create),
);
router.put(
  "/update",
  validator(schema.productFeedbackUpdate),
  asyncHandler(ProductFeedbackController.update),
);
router.delete("/delete/:id", asyncHandler(ProductFeedbackController.delete));

export default router;
