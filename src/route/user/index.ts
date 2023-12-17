import { Router } from "express";
import query from "./queries";
import mutation from "./mutations";
import authentication from "../../middleware/authentication";

const router = Router();

router.use(authentication);

router.use("/", mutation);

router.use("/", query);

export default router;
