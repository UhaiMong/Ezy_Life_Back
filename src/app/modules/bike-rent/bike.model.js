import { Schema, model } from "mongoose";

const BikeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nid: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    drivingLicense: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    fuel: {
      type: Number,
    },
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    rider: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    bikeType: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    rentStatus: {
      type: String,
      default: "Pending",
    },
    total_amount: {
      type: Number,
      required: true,
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

export const BikeRent = model("BikeRent", BikeSchema);
