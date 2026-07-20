import { Router } from "express";
import {
  googleLogin,
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  updateProfile
} from "../controllers/auth.controller";

// const router = Router();

router.post("/google", googleLogin);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", getMe);
router.put("/update-profile", updateProfile);
export default router;