import { Review } from "./review.model.js";

const addReview = async (payload) => {
  const result = (await Review.create(payload)).populate("user");
  return result;
};

const getAllReview = async () => {
  const result = await Review.find().populate("user");
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
