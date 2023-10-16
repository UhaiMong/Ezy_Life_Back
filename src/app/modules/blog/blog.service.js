import ApiError from "../../../errors/ApiError.js";
import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { BlogImage } from "../../middleware/uploader/blogImagesUploader.js";
import { blogSearchableField } from "./blog.constant.js";
import { Blog } from "./blog.model.js";
import httpStatus from "http-status";

const addBlog = async (payload) => {
  const result = await Blog.create(payload);
  return result;
};

const getBlog = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: blogSearchableField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filteredData).length) {
    andConditions.push({
      $and: Object.entries(filteredData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Blog.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBlog = async (id) => {
  const result = await Blog.findById(id);
  return result;
};

const updateBlog = async (id, payload) => {
  const blog = await Blog.findById({ _id: id });

  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }

  if (payload.author_img && blog.author_img) {
    BlogImage.deleteImage(blog.author_img);
  }

  if (payload.image && blog.image) {
    BlogImage.deleteImage(blog.image);
  }

  const result = await Blog.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBlog = async (id) => {
  const blog = await Blog.findById({ _id: id });

  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }

  if (blog.author_img) {
    BlogImage.deleteImage(blog.author_img);
  }

  if (blog.image) {
    BlogImage.deleteImage(blog.image);
  }

  const result = await Blog.findByIdAndDelete({ _id: id });
  return result;
};

export const BlogService = {
  addBlog,
  getBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
