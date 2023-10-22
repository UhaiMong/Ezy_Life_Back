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
      default: "pending",
    },
    shippingStatus: {
      type: String,
      default: "pending",
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
  },
  {
    timestamps: true,
  }
);

export const MedicineOrder = model("MedicineOrder", medicineOrderSchema);
