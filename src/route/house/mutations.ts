import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import houseController from "../../controllers/HouseController";
import validator from "../../middleware/validator";
import schema from "../../schema/house";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post("/create", validator(schema.houseCreate), asyncHandler(houseController.createHouse))
router.put("/update", validator(schema.houseUpdate), asyncHandler(houseController.updateHouse))
router.delete("/delete/:id", asyncHandler(houseController.deleteHouse))

export default router;
