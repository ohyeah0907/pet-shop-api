import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import CartItemController from "../../controllers/CartItemController";
import validator from "../../middleware/validator";
import schema from "../../schema/cart_item";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post(
  "/create",
  validator(schema.cartItemCreate),
  asyncHandler(CartItemController.create),
);
router.put(
  "/update",
  validator(schema.cartItemUpdate),
  asyncHandler(CartItemController.update),
);
router.delete("/delete/:id", asyncHandler(CartItemController.delete));

export default router;
