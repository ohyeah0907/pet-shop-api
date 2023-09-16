import { Router } from "express";
import controller from "../../controllers/DeviceTypeController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(controller.getSearch));

router.get("/codes", asyncHandler(controller.codes))

router.get("/:id", asyncHandler(controller.getById))

export default router;
