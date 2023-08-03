import { Router } from "express";
import controller from "../../controllers/CloudController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.get("/search", asyncHandler(controller.getCloudSearch));

router.get("/:id", asyncHandler(controller.getCloudById))

export default router;
