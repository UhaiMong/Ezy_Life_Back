import express from "express";
import { CategoryImage } from "../../../middleware/uploader/categoryImage.js";
import { CategoryController } from "./blog.controller.js";

const router = express.Router();

router.post(
  "/add-category",
  CategoryImage.uploadImage,
  CategoryController.addCategory
);

router.get("/", CategoryController.getCategories);

router.get("/:id", CategoryController.getCategory);

router.patch(
  "/:id",
  CategoryImage.uploadImage,
  CategoryController.updateCategory
);

router.delete("/:id", CategoryController.deleteCategory);

export const CategoryRoutes = router;
