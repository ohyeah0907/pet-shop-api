import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import petController from "../../controllers/PetController";
import validator from "../../middleware/validator";
import schema from "../../schema/pet";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post("/create", validator(schema.petCreate), asyncHandler(petController.create))
router.put("/update", validator(schema.petUpdate), asyncHandler(petController.update))
router.delete("/delete/:id", asyncHandler(petController.delete))

export default router;
