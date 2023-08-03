import { Router } from "express";
import mutation from "./mutations";
import query from "./queries";
import authentication from "../../middleware/authentication";

const router = Router();

// router.use(authentication)

router.use("/", mutation)

router.use("/", query)

export default router;