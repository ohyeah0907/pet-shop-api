import { Router } from "express";
import pet from "./pet";
import petType from "./pet_type";
import auth from "./auth";
import user from "./user";

const router = Router();

router.use("/pet", pet)
router.use("/pet-type", petType)
router.use("/auth", auth)
router.use("/user", user)


export default router;