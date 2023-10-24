import { Schema, model } from "mongoose";

const mediatorOrderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Mediator",
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
    isReviewed: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const MediatorOrder = model("MediatorOrder", mediatorOrderSchema);
