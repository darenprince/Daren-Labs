import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import formsRouter from "./forms";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(formsRouter);

export default router;
