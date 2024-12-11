import express from "express";
import { authorize } from "../middleware/auth.js";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogInfo,
  updateBlog,
} from "../controller/blogController.js";

const router = express.Router();

router.route("/blog").post(authorize(["admin"]), createBlog);
router.route("/blog/:id").put(authorize(["admin"]), updateBlog);
router.route("/blog/:id").delete(authorize(["admin"]), deleteBlog);
router.route("/blog/:id").get(authorize(["user", "admin"]), getBlogInfo);
router.route("/blogs").get(authorize(["user", "admin"]), getAllBlogs);

export default router;
