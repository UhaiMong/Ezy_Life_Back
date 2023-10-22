import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { medicineSearchableField } from "../medicine/medicine.constants.js";
import { MedicineOrder } from "./medicineOrder.model.js";

const addOrder = async (payload) => {
  const result = await MedicineOrder.create(payload);
  return result;
};

const getAllOrder = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: medicineSearchableField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filteredData).length) {
    andConditions.push({
      $and: Object.entries(filteredData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await MedicineOrder.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await MedicineOrder.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
