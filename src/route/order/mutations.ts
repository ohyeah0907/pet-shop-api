import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import OrderController from "../../controllers/OrderController";
import validator from "../../middleware/validator";
import schema from "../../schema/order";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post(
  "/create",
  validator(schema.orderCreate),
  asyncHandler(OrderController.create),
);
router.put(
  "/update",
  validator(schema.orderUpdate),
  asyncHandler(OrderController.update),
);
router.delete("/delete/:id", asyncHandler(OrderController.delete));

export default router;
