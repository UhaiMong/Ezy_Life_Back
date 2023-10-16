import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Mediator",
    },
    medicine: {
      type: Schema.Types.ObjectId,
      ref: "Medicine",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
    shippingStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model("Order", OrderSchema);
