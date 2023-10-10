import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { ParcelService } from "./parcel.service.js";
import pick from "../../../shared/pick.js";
import { parcelFilterableField } from "./parcel.constants.js";
import { paginationFields } from "../../../constants/pagination.js";

const bookParcel = catchAsync(async (req, res) => {
  const { ...bookingData } = req.body;
  const result = await ParcelService.bookParcel(bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your parcel book successful",
    data: result,
  });
});

const getBookedParcels = catchAsync(async (req, res) => {
  const filters = pick(req.query, parcelFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await ParcelService.getBookedParcels(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Parcels fetch successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getBookedParcel = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ParcelService.getBookedParcel(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Parcel fetch successful",
    data: result,
  });
});
const deleteParcel = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ParcelService.deleteParcel(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Parcel deleted successful",
    data: result,
  });
});

export const ParcelController = {
  bookParcel,
  getBookedParcels,
  getBookedParcel,
  deleteParcel,
};
