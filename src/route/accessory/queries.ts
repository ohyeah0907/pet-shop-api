import { Router } from "express";
import homeController from "../../controllers/AccessoryController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(homeController.getSearch));

router.get("/:id", asyncHandler(homeController.getById));

export default router;
