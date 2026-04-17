import express from "express";
import { getAllPlans } from "../controller/planController.js";
import noCache from "../middleware/noCache.js";
import { validateAuth } from "../middleware/authCheck.js";

const router = express.Router();

router.get("/plans", validateAuth, noCache, getAllPlans);

export default router;
