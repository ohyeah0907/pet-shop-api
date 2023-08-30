import { Router } from "express";
import controller from "../../controllers/UserController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.get("/search", asyncHandler(controller.getUserSearch));

router.get("/:id", asyncHandler(controller.getUserById))

export default router;
