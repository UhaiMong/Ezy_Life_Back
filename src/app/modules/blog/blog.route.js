import express from "express";
import { BlogController } from "./blog.controller.js";
import { BlogImage } from "../../middleware/uploader/blogImagesUploader.js";

const router = express.Router();

router.post("/create-blog", BlogImage.uploadImage, BlogController.addBlog);

router.get("/", BlogController.getBlog);

router.get("/:id", BlogController.getSingleBlog);

router.patch("/:id", BlogController.updateBlog);

router.delete("/:id", BlogController.deleteBlog);

export const BlogRoutes = router;
