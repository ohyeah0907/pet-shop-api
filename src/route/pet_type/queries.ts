import { Router } from "express";
import petTypeController from "../../controllers/PetTypeController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(petTypeController.getSearch));

router.get("/:id", asyncHandler(petTypeController.getById));

export default router;
