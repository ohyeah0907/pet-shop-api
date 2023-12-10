import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import PetController from "../../controllers/PetController";
import validator from "../../middleware/validator";
import schema from "../../schema/pet";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post("/create", validator(schema.petCreate), asyncHandler(PetController.create))
router.put("/update", validator(schema.petUpdate), asyncHandler(PetController.update))
router.delete("/delete/:id", asyncHandler(PetController.delete))

export default router;
