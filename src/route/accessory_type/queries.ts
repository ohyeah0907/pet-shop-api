import { Router } from "express";
import AccessoryTypeController from "../../controllers/AccessoryTypeController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(AccessoryTypeController.getSearch));

router.get("/:id", asyncHandler(AccessoryTypeController.getById));

export default router;
