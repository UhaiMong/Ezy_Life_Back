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
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const MediatorOrder = model("MediatorOrder", mediatorOrderSchema);
