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
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
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
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    bikeType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BikeRent = model("BikeRent", BikeSchema);
