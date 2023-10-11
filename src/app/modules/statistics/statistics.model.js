import { Schema, model } from "mongoose";

const statisticSchema = new Schema(
  {
    service_name: String,
    service_count: String,
    color: String,
    name: String,
    bike_rent: String,
    parcel: String,
    medicine: String,
    local_product: String,
  },
  {
    timestamps: true,
  }
);

export const Statistic = model("statistics", statisticSchema);
