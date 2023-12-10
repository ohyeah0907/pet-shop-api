import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import CartController from "../../controllers/CartController";
import validator from "../../middleware/validator";
import schema from "../../schema/cart";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post(
  "/create",
  validator(schema.cartCreate),
  asyncHandler(CartController.create),
);
router.put(
  "/update",
  validator(schema.cartUpdate),
  asyncHandler(CartController.update),
);
router.delete("/delete/:id", asyncHandler(CartController.delete));

export default router;
