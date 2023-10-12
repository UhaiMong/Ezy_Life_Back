import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { Banner } from "./banner.model.js";
import { bannersSearchableField } from "./banner.constant.js";

const createBanner = async (payload) => {
  const result = await Banner.create(payload);
  return result;
};

const getAllBanners = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bannersSearchableField.map((field) => ({
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

  const result = await Banner.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Banner.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBanner = async (id) => {
  const result = await Banner.findOne({ _id: id });
  return result;
};

const updateBanner = async (id, payload) => {
  const result = await Banner.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBanner = async (id) => {
  const result = await Banner.findByIdAndDelete({ _id: id });
  return result;
};

export const BannerService = {
  createBanner,
  getAllBanners,
  getSingleBanner,
  updateBanner,
  deleteBanner,
};
