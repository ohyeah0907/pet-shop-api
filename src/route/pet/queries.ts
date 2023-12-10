import { Router } from "express";
import PetController from "../../controllers/PetController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(PetController.getSearch));

router.get("/:id", asyncHandler(PetController.getById));

export default router;
