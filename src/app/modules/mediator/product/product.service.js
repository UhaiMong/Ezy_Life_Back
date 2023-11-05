import httpStatus from "http-status";
import { Mediator } from "./product.model.js";
import { paginationHelper } from "../../../../helpers/paginationHelpers.js";
import { mediatorSearchableField } from "./product.constants.js";
import { MediatorImage } from "../../../middleware/uploader/mediatorImage.js";
import ApiError from "../../../../errors/ApiError.js";

const addProduct = async (payload) => {
  const result = await Mediator.create(payload);
  return result;
};

const getAllProduct = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: mediatorSearchableField.map((field) => ({
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

  const result = await Mediator.find(whereCondition)
    .populate("category")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Mediator.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getProductById = async (id) => {
  const result = await Mediator.findById({ _id: id });
  return result;
};

const updateProduct = async (id, payload) => {
  const product = await Mediator.findById({ _id: id });

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found");
  }

  if (payload?.image && product?.image) {
    MediatorImage.deleteImage(product?.image);
  }

  const result = await Mediator.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteProduct = async (id) => {
  const product = await Mediator.findById({ _id: id });

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Mediator Not Found");
  }

  if (product.image) {
    MediatorImage.deleteImage(product.image);
  }

  const result = await Mediator.findOneAndDelete({ _id: id });
  return result;
};

export const MediatorService = {
  addProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
