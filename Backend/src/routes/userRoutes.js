import express from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  RefreshToken,
  getCurrentUser
} from "../controller/userController.js";
import { validation } from "../middleware/validation.js";
import {
  LoginValidation,
  UserValidation,
} from "../validation/userValidation.js";
import { validateAuth } from "../middleware/authCheck.js";
const router = express.Router();

router.post("/auth/register", validation(UserValidation), RegisterUser);
router.post("/auth/login", validation(LoginValidation), LoginUser);

router.post("/logout", validateAuth, LogoutUser);
router.post("/refresh", RefreshToken);

router.get("/me",validateAuth,getCurrentUser)

export default router;
