import { Router } from "express";
import ProductPromotionController from "../../controllers/ProductPromotionController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(ProductPromotionController.getSearch));

router.get("/:id", asyncHandler(ProductPromotionController.getById));

export default router;
