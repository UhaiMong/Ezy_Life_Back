import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import { ReviewService } from "./review.service.js";

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
  const result = await ReviewService.getAllReview();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews fetched successfully",
    data: result,
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

export const ReviewController = {
  addReview,
  getAllReview,
  getSingleReview,
};
