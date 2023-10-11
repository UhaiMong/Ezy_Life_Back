import { BikeRent } from "../bike-rent/bike.model.js";
import { Parcel } from "../parcel/parcel.model.js";

const getStatistic = async () => {
  const bikeRentCount = await BikeRent.countDocuments();
  const parcelCount = await Parcel.countDocuments();
  const medicine = 20;
  const product = 10;

  const data = [
    { name: "Bike Rent", value: bikeRentCount, color: "#0088FE" },
    { name: "Parcel", value: parcelCount, color: "#00C49F" },
    { name: "Medicine", value: medicine, color: "#FFBB28" },
    { name: "Product", value: product, color: "#FF8042" },
  ];

  return data;
};

export const StatisticService = {
  getStatistic,
};
