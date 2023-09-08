import { Router } from "express";
import asyncHandler from "../../handler/asyncHandler";
import homeController from "../../controllers/HomeController";
import validator from "../../middleware/validator";
import schema from "../../schema/home";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication);

router.post("/create", validator(schema.homeCreate), asyncHandler(homeController.createHome))
router.put("/update", validator(schema.homeUpdate), asyncHandler(homeController.updateHome))
router.delete("/delete/:id", asyncHandler(homeController.deleteHome))
router.post("/translation/create", validator(schema.homeTranslationCreate), asyncHandler(homeController.createHomeTranslation))
router.put("/translation/update", validator(schema.homeTranslationUpdate), asyncHandler(homeController.updateHomeTranslation))
router.delete("/translation/delete/:id", asyncHandler(homeController.deleteHomeTranslation))

export default router;
