import { Router } from "express";
import houseController from "../../controllers/HouseController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.get("/search", asyncHandler(houseController.getHouseSearch));

router.get("/:id", asyncHandler(houseController.getHouseById))

router.get("/house-info/:id", asyncHandler(houseController.getHouseInfo))


export default router;
