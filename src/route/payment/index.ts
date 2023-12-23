import { Router } from "express";
import authentication from "../../middleware/authentication";
import asyncHandler from "../../handler/asyncHandler";
import controller from "../../controllers/PaymentController";
import validator from "../../middleware/validator";
import schema from "../../schema/payment";

const router = Router();


router.post(
  "/checkout/momo",
  validator(schema.payment),
  authentication,
  asyncHandler(controller.checkout),
);
router.get("/return/momo", asyncHandler(controller.returnMomo));

export default router;
