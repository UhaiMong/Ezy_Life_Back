import { Schema, model } from "mongoose";

const medicineOrderSchema = new Schema(
  {
    medicines: [
      {
        medicine: {
          type: Schema.Types.ObjectId,
          ref: "Medicine",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    shippingStatus: {
      type: String,
      default: "Pending",
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    deliveryCharge: {
      type: Number,
    },
    isReviewed: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const MedicineOrder = model("MedicineOrder", medicineOrderSchema);
