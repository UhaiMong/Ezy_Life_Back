import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import { BlogService } from "./blog.service.js";
import sendResponse from "../../../shared/sendResponse.js";
import pick from "../../../shared/pick.js";
import { blogFilterableField } from "./blog.constant.js";
import { paginationFields } from "../../../constants/pagination.js";

const addBlog = catchAsync(async (req, res) => {
  const author_img = req.author_img;
  const image = req.image;
  const { ...blogData } = req.body;
  const data = { ...blogData, author_img, image };
  const result = await BlogService.addBlog(data);

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
    message: "Blogs retrived successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const result = await BlogService.getSingleBlog(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog retrived successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const result = await BlogService.updateBlog(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await BlogService.deleteBlog(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

export const BlogController = {
  addBlog,
  getBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
