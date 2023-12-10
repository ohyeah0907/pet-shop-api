import { Router } from "express";
import OrderController from "../../controllers/OrderController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(OrderController.getSearch));

router.get("/:id", asyncHandler(OrderController.getById));

export default router;
