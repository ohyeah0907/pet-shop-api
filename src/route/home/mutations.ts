import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import homeController from "../../controllers/HomeController";
import validator from "../../middleware/validator";
import schema from "../../schema/home";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post("/create", validator(schema.homeCreate), asyncHandler(homeController.createHome))
router.post("/create-full-option",  asyncHandler(homeController.createFullOptionHomeRoleUser))
router.put("/update", validator(schema.homeUpdate), asyncHandler(homeController.updateHome))
router.delete("/delete/:id", asyncHandler(homeController.deleteHome))

export default router;
