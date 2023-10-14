import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError.js";
import { Category } from "./category.model.js";
import { CategoryImage } from "../../../middleware/uploader/categoryImage.js";

const addCategory = async (payload) => {
  const result = await Category.create(payload);
  return result;
};

const getCategories = async () => {
  const result = await Category.find();
  return result;
};

const getCategory = async (id) => {
  const result = await Category.findById({ _id: id });
  return result;
};

const updateCategory = async (id, payload) => {
  const category = await Category.findById({ _id: id });

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not  Found");
  }

  if (category.image && payload.image) {
    CategoryImage.deleteImage(category.image);
  }

  const result = await Category.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCategory = async (id) => {
  const category = await Category.findById({ _id: id });

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  }

  if (category.image) {
    CategoryImage.deleteImage(category.image);
  }

  const result = await Category.findByIdAndDelete({ _id: id });
  return result;
};

export const CategoryService = {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
