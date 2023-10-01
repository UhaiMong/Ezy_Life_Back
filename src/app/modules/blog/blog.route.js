import express from "express";
import { BlogValidation } from "./blog.validation.js";
import { BlogController } from "./blog.controller.js";
import validateRequest from "../../middleware/validationRequest.js";

const router = express.Router();

router.post(
  "/create-blog",
  validateRequest(BlogValidation.blogZodSchema),
  BlogController.addBlog
);

router.get("/", BlogController.getBlog);

router.get("/:id", BlogController.getSingleBlog);

router.patch("/:id", BlogController.updateBlog);

router.delete("/:id", BlogController.deleteBlog);

export const BlogRoutes = router;
