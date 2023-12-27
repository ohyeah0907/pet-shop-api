import { Router } from "express";
import OrderDetailController from "../../controllers/OrderDetailController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(OrderDetailController.getSearch));
router.post(
  "/search/order",
  asyncHandler(OrderDetailController.getAllOrderDetailByOrderId),
);
router.get("/:id", asyncHandler(OrderDetailController.getById));

export default router;
