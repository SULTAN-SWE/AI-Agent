import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import dashboardRouter from "./dashboard";
import requestsRouter from "./requests";
import approvalsRouter from "./approvals";
import knowledgeRouter from "./knowledge";
import auditRouter from "./audit";
import settingsRouter from "./settings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(dashboardRouter);
router.use(requestsRouter);
router.use(approvalsRouter);
router.use(knowledgeRouter);
router.use(auditRouter);
router.use(settingsRouter);

export default router;
