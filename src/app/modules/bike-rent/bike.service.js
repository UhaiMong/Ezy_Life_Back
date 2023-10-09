import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { bikeSearchableField } from "./bike.constants.js";
import { BikeRent } from "./bike.model.js";

const bookBikeRent = async (payload) => {
  const result = (await BikeRent.create(payload)).populate("user");
  return result;
};

const getBikeBookings = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bikeSearchableField.map((field) => ({
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

  const result = await BikeRent.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("user");

  const total = await BikeRent.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BikeRentService = { bookBikeRent, getBikeBookings };
