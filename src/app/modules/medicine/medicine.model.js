import { Schema, model } from "mongoose";

const MedicineSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    cat: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    pharmacyName: {
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
    about: {
      type: String,
      required: true,
    },
    info: {
      type: String,
    },
    type: {
      type: String,
    },
    power: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Medicine = model("Medicine", MedicineSchema);
