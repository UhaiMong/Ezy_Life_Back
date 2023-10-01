import { Schema, model } from "mongoose";

const ParcelSchema = new Schema(
  {
    p_type: {
      type: String,
      required: true,
    },
    p_weight: {
      type: String,
      required: true,
    },
    sender_name: {
      type: String,
      required: true,
    },
    primary_num: {
      type: String,
      required: true,
    },
    secondary_num: {
      type: String,
    },
    sender_address: {
      type: String,
      required: true,
    },
    receiver_name: {
      type: String,
      required: true,
    },
    receiver_address: {
      type: String,
      required: true,
    },
    receiver_phone: {
      type: Number,
      required: true,
    },
    sending_date: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    parcelStatus: {
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

export const Parcel = model("Parcel", ParcelSchema);
