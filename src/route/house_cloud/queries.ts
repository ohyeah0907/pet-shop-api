import { Router } from "express";
import controller from "../../controllers/HouseCloudController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.get("/search", asyncHandler(controller.getHouseCloudSearch));

router.get("/:id", asyncHandler(controller.getHouseCloudById))

export default router;
