import { Router } from "express";
import PromotionController from "../../controllers/PromotionController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(PromotionController.getSearch));

router.get("/:id", asyncHandler(PromotionController.getById));

export default router;
