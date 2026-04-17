import express from "express";
import {
  AddSubscription,
  getCurrentSubscription,
} from "../controller/subscriptionController.js";
import { validateAuth } from "../middleware/authCheck.js";
import { checkActiveSubscription } from "../middleware/checkSubscription.js";
import noCache from "../middleware/noCache.js";
const router = express.Router();

router.use(noCache);
router.post("/subscribe/:planId", validateAuth, AddSubscription);
router.get(
  "/my-subscription",
  validateAuth,
  checkActiveSubscription,
  getCurrentSubscription,
);

export default router;
