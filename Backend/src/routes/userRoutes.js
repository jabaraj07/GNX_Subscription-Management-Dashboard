import express from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  RefreshToken,
  getCurrentUser,
} from "../controller/userController.js";
import { validation } from "../middleware/validation.js";
import {
  LoginValidation,
  UserValidation,
} from "../validation/userValidation.js";
import { validateAuth } from "../middleware/authCheck.js";
import noCache from "../middleware/noCache.js";
const router = express.Router();

router.post("/auth/register", validation(UserValidation), RegisterUser);
router.post("/auth/login", validation(LoginValidation), LoginUser);
router.post("/refresh", RefreshToken);

router.use(noCache);

router.post("/logout", validateAuth, LogoutUser);
router.get("/me", validateAuth, getCurrentUser);

export default router;
