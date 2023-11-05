import ApiError from "../../../errors/ApiError.js";
import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { BikeRent } from "../bike-rent/bike.model.js";
import { MediatorOrder } from "../mediatorOrder/mediatorOrder.model.js";
import { medicineSearchableField } from "../medicine/medicine.constants.js";
import { MedicineOrder } from "../medicineOrder/medicineOrder.model.js";
import { Parcel } from "../parcel/parcel.model.js";
import { Review } from "./review.model.js";
import httpStatus from "http-status";

const addReview = async (payload) => {
  const session = await Review.startSession();
  session.startTransaction();

  try {
    const itemToModelMap = {
      parcel: Parcel,
      bike: BikeRent,
      medicine: MedicineOrder,
      mediator: MediatorOrder,
    };

    if (itemToModelMap[payload.item]) {
      await itemToModelMap[payload.item].findByIdAndUpdate(
        { _id: payload.orderId },
        { isReviewed: true },
        {
          new: true,
        }
      );
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Internal Server  Error");
    }

    const reviewResult = await Review.create(payload);

    await session.commitTransaction();
    session.endSession();
    return reviewResult;
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    // Handle the error appropriately, e.g., throw a specific API error
    throw new ApiError(httpStatus.BAD_REQUEST, "Internal Server  Error");
  }
};

const getAllReview = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: medicineSearchableField.map((field) => ({
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

  const result = await Review.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("user");

  const total = await Review.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleReview = async (id) => {
  const result = await Review.findById({ _id: id }).populate("user");
  return result;
};

const updateReview = async (id, payload) => {
  const result = await Review.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteReview = async (id) => {
  const result = await Review.findByIdAndDelete({ _id: id });
  return result;
};

export const ReviewService = {
  addReview,
  getAllReview,
  getSingleReview,
  deleteReview,
  updateReview,
};
