import express from "express";
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/userConrollers.js";
const router = express.Router();

router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUser);

export default router;
