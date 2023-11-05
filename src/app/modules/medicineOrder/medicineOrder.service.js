import mongoose from "mongoose";
import ApiError from "../../../errors/ApiError.js";
import { MedicineOrder } from "./medicineOrder.model.js";
import httpStatus from "http-status";

const addOrder = async (payload) => {
  const result = await MedicineOrder.create(payload);
  return result;
};

const getAllOrder = async () => {
  const result = await MedicineOrder.find()
    .populate({
      path: "medicines.medicine",
      model: "Medicine",
    })
    .populate("user");
  return result;
};

const getOrderById = async (id) => {
  const result = await MedicineOrder.findById(id);
  return result;
};

const getLoggedInUserOrders = async (id) => {
  try {
    const userId = new mongoose.Types.ObjectId(id);

    const result = await MedicineOrder.find()
      .populate({
        path: "medicines.medicine",
        model: "Medicine",
      })
      .populate("user");

    const loggedInUserOrders = result.filter((order) =>
      order.user._id.equals(userId)
    );

    return loggedInUserOrders;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "An error occurred while fetching orders"
    );
  }
};

const updateOrder = async (id, payload) => {
  const result = await MedicineOrder.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteOrder = async (id) => {
  const result = await MedicineOrder.findOneAndDelete({ _id: id });
  return result;
};

export const MedicineOrderService = {
  addOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getLoggedInUserOrders,
};
