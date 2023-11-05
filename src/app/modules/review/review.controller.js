import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import { ReviewService } from "./review.service.js";
import pick from "../../../shared/pick.js";
import { reviewFilterableField } from "./review.constant.js";
import { paginationFields } from "../../../constants/pagination.js";

const addReview = catchAsync(async (req, res) => {
  const { ...payload } = req.body;
  const result = await ReviewService.addReview(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review added successfully",
    data: result,
  });
});

const getAllReview = catchAsync(async (req, res) => {
  const filters = pick(req.query, reviewFilterableField);
  const options = pick(req.query, paginationFields);
  const result = await ReviewService.getAllReview(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews fetched successful",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleReview = catchAsync(async (req, res) => {
  const result = await ReviewService.getSingleReview(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review fetched successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const { ...reviewData } = req.body;
  const result = await ReviewService.updateReview(req.params.id, reviewData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Deleted successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const result = await ReviewService.deleteReview(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Deleted successfully",
    data: result,
  });
});

export const ReviewController = {
  addReview,
  getAllReview,
  getSingleReview,
  deleteReview,
  updateReview,
};
