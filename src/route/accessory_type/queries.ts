import { Router } from "express";
import accessoryTypeController from "../../controllers/AccessoryTypeController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(accessoryTypeController.getSearch));

router.get("/:id", asyncHandler(accessoryTypeController.getById));

export default router;
