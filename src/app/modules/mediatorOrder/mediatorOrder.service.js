import { MediatorOrder } from "./mediatorOrder.model.js";

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
};
