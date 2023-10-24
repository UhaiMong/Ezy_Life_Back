import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    start: {
      type: Number,
      default: 5,
    },
    isApproved: {
      type: String,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Review = model("Review", reviewSchema);
