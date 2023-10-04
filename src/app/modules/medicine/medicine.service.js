import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { medicineSearchableField } from "./medicine.constants.js";
import { Medicine } from "./medicine.model.js";

const addMedicine = async (payload) => {
  const result = await Medicine.create(payload);
  return result;
};

const getAllMedicine = async (filters, paginationOption) => {
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

  const result = await Medicine.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Medicine.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMedicineById = async (id) => {
  const result = await Medicine.findById(id);
  return result;
};

const updateMedicine = async (id, payload) => {
  console.log(payload);
  const result = await Medicine.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteMedicine = async (id) => {
  const result = await Medicine.findOneAndDelete(id);
  return result;
};

export const MedicineService = {
  addMedicine,
  getAllMedicine,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
