import express from "express";
import { getAllSubscription } from "../controller/adminController.js";
import { checkRole } from "../middleware/checkRole.js";
import { validateAuth } from "../middleware/authCheck.js";
import noCache from "../middleware/noCache.js";

const router = express.Router();

router.get(
  "/subscriptions",
  validateAuth,
  checkRole,
  noCache,
  getAllSubscription,
);

export default router;
