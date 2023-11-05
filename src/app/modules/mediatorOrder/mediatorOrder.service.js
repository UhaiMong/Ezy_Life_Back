import mongoose from "mongoose";
import { MediatorOrder } from "./mediatorOrder.model.js";
import ApiError from "../../../errors/ApiError.js";
import httpStatus from "http-status";

const addOrder = async (payload) => {
  const result = await MediatorOrder.create(payload);
  return result;
};

const getAllOrder = async () => {
  const result = await MediatorOrder.find()
    .populate({
      path: "products.product",
      model: "Mediator",
    })
    .populate("user");
  return result;
};

const getOrderById = async (id) => {
  const result = await MediatorOrder.findById(id)
    .populate({
      path: "products.product",
      model: "Mediator",
    })
    .populate("user");
  return result;
};

const updateOrder = async (id, payload) => {
  const result = await MediatorOrder.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const getLoggedInUserOrders = async (id) => {
  try {
    const userId = new mongoose.Types.ObjectId(id);

    const result = await MediatorOrder.find()
      .populate({
        path: "products.product",
        model: "Mediator",
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

const deleteOrder = async (id) => {
  const result = await MediatorOrder.findOneAndDelete({ _id: id });
  return result;
};

export const MediatorOrderService = {
  addOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getLoggedInUserOrders,
};
