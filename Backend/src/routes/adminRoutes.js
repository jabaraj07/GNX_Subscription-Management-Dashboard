import express from "express";
import { getAllSubscription } from "../controller/adminController.js";
import { checkRole } from "../middleware/checkRole.js";
import { validateAuth } from "../middleware/authCheck.js";
const router = express.Router();

router.get("/subscriptions", validateAuth, checkRole, getAllSubscription);

export default router;
