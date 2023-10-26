import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { parcelSearchableField } from "./parcel.constants.js";
import { Parcel } from "./parcel.model.js";

const bookParcel = async (payload) => {
  const result = (await Parcel.create(payload)).populate("user");
  return result;
};

const getBookedParcels = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: parcelSearchableField.map((field) => ({
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

  const result = await Parcel.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("user");

  const total = await Parcel.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getBookedParcel = async (id) => {
  const result = (await Parcel.findById({ _id: id })).populate("user");
  return result;
};

const updateBookedParcel = async (id, payload) => {
  const result = (
    await Parcel.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    })
  ).populate("user");
  return result;
};

const deleteParcel = async (id) => {
  const result = await Parcel.findByIdAndDelete({ _id: id });
  return result;
};

export const ParcelService = {
  bookParcel,
  getBookedParcels,
  getBookedParcel,
  deleteParcel,
  updateBookedParcel,
};
