import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import petTypeController from "../../controllers/PetTypeController";
import validator from "../../middleware/validator";
import schema from "../../schema/pet_type";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post("/create", validator(schema.petTypeCreate), asyncHandler(petTypeController.create))
router.put("/update", validator(schema.petTypeUpdate), asyncHandler(petTypeController.update))
router.delete("/delete/:id", asyncHandler(petTypeController.delete))

export default router;
