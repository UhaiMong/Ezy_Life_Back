import { Schema, model } from "mongoose";

const mediatorOrderSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Mediator",
    },
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

export const MediatorOrder = model("MediatorOrder", mediatorOrderSchema);
