import express from "express";
import { getAllPlans } from "../controller/planController.js";

import { validateAuth } from "../middleware/authCheck.js";
const router = express.Router();

router.get("/plans", validateAuth, getAllPlans);

export default router;
