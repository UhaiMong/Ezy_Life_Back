import { Schema, model } from "mongoose";

const MediatorSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    info: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

MediatorSchema.pre("save", function (next) {
  if (this.basePrice && this.discountPrice) {
    const percentageDiscount =
      ((this.basePrice - this.discountPrice) / this.basePrice) * 100;

    this.discount = Math.round(percentageDiscount * 100) / 100;
  } else {
    this.discount = null;
  }

  next();
});

export const Mediator = model("Mediator", MediatorSchema);
