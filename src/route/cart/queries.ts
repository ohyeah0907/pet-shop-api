import { Router } from "express";
import CartController from "../../controllers/CartController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(CartController.getSearch));

router.get("/:id", asyncHandler(CartController.getById));

export default router;
