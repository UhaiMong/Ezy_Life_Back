import mongoose from "mongoose";
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

const getBikeBooking = async (id) => {
  const result = await BikeRent.findById({ _id: id }).populate("user");
  return result;
};

const getLoggedInUserOrders = async (id) => {
  try {
    const userId = new mongoose.Types.ObjectId(id);

    const result = await BikeRent.find().populate("user");

    const loggedInUserOrders = result.filter((order) =>
      order.user._id.equals(userId)
    );

    if (loggedInUserOrders.length === 0) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "No Orders Found for the Logged-In User"
      );
    }
    return loggedInUserOrders;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "An error occurred while fetching orders"
    );
  }
};

const updateBikeBooking = async (id, payload) => {
  const result = await BikeRent.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate("user");
  return result;
};

const deleteBooking = async (id) => {
  const result = await BikeRent.findByIdAndDelete({ _id: id });
  return result;
};

export const BikeRentService = {
  bookBikeRent,
  getBikeBookings,
  getBikeBooking,
  updateBikeBooking,
  deleteBooking,
  getLoggedInUserOrders,
};
