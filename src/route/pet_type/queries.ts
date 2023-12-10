import { Router } from "express";
import PetTypeController from "../../controllers/PetTypeController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.post("/search", asyncHandler(PetTypeController.getSearch));

router.get("/:id", asyncHandler(PetTypeController.getById));

export default router;
