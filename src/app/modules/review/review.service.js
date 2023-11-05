import ApiError from "../../../errors/ApiError.js";
import { BikeRent } from "../bike-rent/bike.model.js";
import { MediatorOrder } from "../mediatorOrder/mediatorOrder.model.js";
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

const getAllReview = async () => {
  const result = await Review.find()
    .sort({ createdAt: -1 })
    .populate("user")
    .limit(3);
  return result;
};

const getSingleReview = async (id) => {
  const result = await Review.findOne({ _id: id }).populate("user");
  return result;
};

export const ReviewService = {
  addReview,
  getAllReview,
  getSingleReview,
};
