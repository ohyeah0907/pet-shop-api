import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import OrderDetailController from "../../controllers/OrderDetailController";
import validator from "../../middleware/validator";
import schema from "../../schema/order_detail";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post(
  "/create",
  validator(schema.orderDetailCreate),
  asyncHandler(OrderDetailController.create),
);
router.put(
  "/update",
  validator(schema.orderDetailUpdate),
  asyncHandler(OrderDetailController.update),
);
router.delete("/delete/:id", asyncHandler(OrderDetailController.delete));

export default router;
