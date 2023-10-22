import { MedicineOrder } from "./medicineOrder.model.js";

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
};
