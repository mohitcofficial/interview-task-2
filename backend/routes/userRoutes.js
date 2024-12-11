import express from "express";
import {
  createAdmin,
  createUser,
  getMyProfile,
  logout,
  userLogin,
  verify,
} from "../controller/userController.js";
import { authorize } from "../middleware/auth.js";

const router = express.Router();

router.route("/user/signup").post(createUser);
router.route("/admin/signup").post(createAdmin);
router.route("/login").post(userLogin);
router.route("/verify").post(verify);
router.route("/me").get(authorize(["user", "admin"]), getMyProfile);
router.route("/logout").post(authorize(["user", "admin"]), logout);

export default router;
