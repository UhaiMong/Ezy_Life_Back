import { Schema, model } from "mongoose";

const statisticSchema = new Schema(
  {
    service_name: {
      type: String,
      required: true,
    },
    service_count: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Statistic = model("statistics", statisticSchema);
