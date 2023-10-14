import httpStatus from "http-status";
import catchAsync from "../../../../shared/catchAsync.js";
import sendResponse from "../../../../shared/sendResponse.js";
import { CategoryService } from "./category.service.js";

const addCategory = catchAsync(async (req, res) => {
  const image = req.image;
  const { ...categoryData } = req.body;
  const payload = { ...categoryData, image };
  const result = await CategoryService.addCategory(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category added successful",
    data: result,
  });
});

const getCategories = catchAsync(async (req, res) => {
  const result = await CategoryService.getCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories fetch successfully",
    data: result,
  });
});

const getCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.getCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category fetch successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const image = req.image;
  const { ...categoryData } = req.body;
  const payload = image ? { ...categoryData, image } : categoryData;
  const result = await CategoryService.updateCategory(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.deleteCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

export const CategoryController = {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
