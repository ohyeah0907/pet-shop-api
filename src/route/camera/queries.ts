import { Router } from "express";
import controller from "../../controllers/CameraController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.get("/search", asyncHandler(controller.getSearch));

router.get("/:id", asyncHandler(controller.getById))

export default router;
