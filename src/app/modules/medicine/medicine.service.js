import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";
import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { medicineSearchableField } from "./medicine.constants.js";
import { Medicine } from "./medicine.model.js";
import { MedicineImage } from "../../middleware/uploader/medicineImage.js";

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
  const medicine = await Medicine.findById({ _id: id });

  if (!medicine) {
    throw new ApiError(httpStatus.NOT_FOUND, "Medicine Not Found");
  }

  if (payload?.img && medicine?.img) {
    MedicineImage.deleteImage(medicine?.img);
  }

  const result = await Medicine.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteMedicine = async (id) => {
  const medicine = await Medicine.findById({ _id: id });

  if (!medicine) {
    throw new ApiError(httpStatus.NOT_FOUND, "Medicine Not Found");
  }

  if (medicine.img) {
    MedicineImage.deleteImage(medicine.img);
  }

  const result = await Medicine.findOneAndDelete({ _id: id });
  return result;
};

export const MedicineService = {
  addMedicine,
  getAllMedicine,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
