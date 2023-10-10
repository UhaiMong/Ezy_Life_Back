import express from "express";
import { BlogValidation } from "./blog.validation.js";
import { BlogController } from "./blog.controller.js";
import validateRequest from "../../middleware/validationRequest.js";
import avatarUpload from "../../middleware/uploader/uploadImage.js";
import blogImagesUploader from "../../middleware/uploader/blogImagesUploader.js";

const router = express.Router();

router.post("/create-blog", blogImagesUploader, BlogController.addBlog);

router.get("/", BlogController.getBlog);

router.get("/:id", BlogController.getSingleBlog);

router.patch("/:id", BlogController.updateBlog);

router.delete("/:id", BlogController.deleteBlog);

export const BlogRoutes = router;
