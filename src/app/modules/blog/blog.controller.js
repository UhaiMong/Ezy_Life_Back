import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import { BlogService } from "./blog.service.js";
import sendResponse from "../../../shared/sendResponse.js";
import pick from "../../../shared/pick.js";
import { blogFilterableField } from "./blog.constant.js";
import { paginationFields } from "../../../constants/pagination.js";

const addBlog = catchAsync(async (req, res) => {
  const { ...blogData } = req.body;
  const result = await BlogService.addBlog(blogData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog added successful",
    data: result,
  });
});

const getBlog = catchAsync(async (req, res) => {
  const filters = pick(req.query, blogFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await BlogService.getBlog(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog retrived successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const BlogController = { addBlog, getBlog };
