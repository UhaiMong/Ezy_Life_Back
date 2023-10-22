import ApiError from "../../../errors/ApiError.js";
import { BikeRent } from "../bike-rent/bike.model.js";
import { Parcel } from "../parcel/parcel.model.js";
import moment from "moment";
import httpStatus from "http-status";
import { MedicineOrder } from "../medicineOrder/medicineOrder.model.js";
import { MediatorOrder } from "../mediatorOrder/mediatorOrder.model.js";

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
const getDailyBooking = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const bikeRentData = await BikeRent.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        bike_rent: { $sum: "$total_amount" },
      },
    },
  ]);

  const parcelData = await Parcel.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        parcel: { $sum: "$total_amount" },
      },
    },
  ]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const combinedData = {};

  daysOfWeek.forEach((day) => {
    combinedData[day] = {
      name: day,
      bike_rent: 0,
      parcel: 0,
      medicine: 0,
      product: 0,
    };
  });

  function mergeData(sourceData, sourceKey) {
    sourceData.forEach((item) => {
      const day = moment(item._id).format("dddd").slice(0, 3);
      const totalAmount = item[sourceKey];
      if (combinedData[day]) {
        combinedData[day][sourceKey] = totalAmount;
      }
    });
  }

  mergeData(bikeRentData, "bike_rent");
  mergeData(parcelData, "parcel");

  const data = Object.values(combinedData);

  return data;
};

const latestTransaction = async () => {
  try {
    const lastTwoBikeTransaction = await BikeRent.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .populate("user");
    const lastTwoParcelTransaction = await Parcel.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .populate("user");
    const lastTwoMedicineTransaction = await MedicineOrder.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .populate("user");
    const lastTwoProductTransaction = await MediatorOrder.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .populate("user");

    const bikeTransactionData = lastTwoBikeTransaction.map((transaction) => ({
      id: transaction._id,
      email: transaction.user.email,
      photoURL: transaction.user.photoURL,
      name: transaction.user.name,
      total_amount: transaction.total_amount,
      transaction: "bike",
    }));

    const parcelTransactionData = lastTwoParcelTransaction.map(
      (transaction) => ({
        id: transaction._id,
        email: transaction.user.email,
        photoURL: transaction.user.photoURL,
        name: transaction.user.name,
        total_amount: transaction.total_amount,
        transaction: "parcel",
      })
    );

    const medicineTransactionData = lastTwoMedicineTransaction.map(
      (transaction) => ({
        id: transaction._id,
        email: transaction.user.email,
        photoURL: transaction.user.photoURL,
        name: transaction.user.name,
        total_amount: transaction.totalPrice,
        transaction: "medicine",
      })
    );
    const productTransactionData = lastTwoProductTransaction.map(
      (transaction) => ({
        id: transaction._id,
        email: transaction.user.email,
        photoURL: transaction.user.photoURL,
        name: transaction.user.name,
        total_amount: transaction.totalPrice,
        transaction: "product",
      })
    );

    const combinedTransactionData = bikeTransactionData
      .concat(parcelTransactionData)
      .concat(medicineTransactionData)
      .concat(productTransactionData);

    return combinedTransactionData;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST);
  }
};

export const StatisticService = {
  getStatistic,
  getDailyBooking,
  latestTransaction,
};
