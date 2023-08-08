import { Router } from "express";
import controller from "../../controllers/HomeCloudController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.get("/search", asyncHandler(controller.getHomeCloudSearch));

router.get("/:id", asyncHandler(controller.getHomeCloudById))

export default router;
