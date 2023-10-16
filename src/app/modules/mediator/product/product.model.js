import { Schema, model } from "mongoose";
import { Category } from "../category/category.model.js";

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
    categoryFlag: {
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

MediatorSchema.pre("save", async function (next) {
  if (this.isModified("category")) {
    try {
      const category = await Category.findById(this.category);
      console.log(category);
      if (category) {
        this.categoryFlag = category.name;
      }
    } catch (error) {
      console.error("Error populating category:", error);
    }
  }

  next();
});

export const Mediator = model("Mediator", MediatorSchema);
