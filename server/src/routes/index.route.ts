import { Router } from "express";
import taskRouter from "./task.route";
import healthRouter from "./health.route";

const router = Router();

router.use(taskRouter);
router.use(healthRouter);

export default router;
