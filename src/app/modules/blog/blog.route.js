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

export const BlogRoutes = router;
