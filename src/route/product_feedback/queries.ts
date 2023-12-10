import { Router } from "express";
import ProductFeedbackController from "../../controllers/ProductFeedbackController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(ProductFeedbackController.getSearch));

router.get("/:id", asyncHandler(ProductFeedbackController.getById));

export default router;
