import { Router } from "express";
import CartItemController from "../../controllers/CartItemController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(CartItemController.getSearch));

router.get("/:id", asyncHandler(CartItemController.getById));

export default router;
