import { Router } from "express";
import homeController from "../../controllers/HomeController";
import asyncHandler from "../../handler/asyncHandler";

const router = Router();

router.get("/search", asyncHandler(homeController.getHomeSearch));

router.get("/:id", asyncHandler(homeController.getHomeById))

router.get("/home-info/:id", asyncHandler(homeController.getHomeInfo))


export default router;
