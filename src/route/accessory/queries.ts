import { Router } from "express";
import AccessoryController from "../../controllers/AccessoryController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(AccessoryController.getSearch));

router.get("/:id", asyncHandler(AccessoryController.getById));

export default router;
