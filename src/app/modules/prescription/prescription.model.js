import { Schema, model } from "mongoose";

const prescriptionSchema = new Schema(
  {
    prescription: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    shippingStatus: {
      type: String,
      default: "Pending",
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

export const Prescription = model("Prescription", prescriptionSchema);
