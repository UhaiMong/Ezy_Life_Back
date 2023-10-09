import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import { BikeRentService } from "./bike.service.js";
import sendResponse from "../../../shared/sendResponse.js";
import { bikeFilterableField } from "./bike.constants.js";
import pick from "../../../shared/pick.js";
import { paginationFields } from "../../../constants/pagination.js";

const bookBikeRent = catchAsync(async (req, res) => {
  const { ...bookingData } = req.body;
  const result = await BikeRentService.bookBikeRent(bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your rent book successful",
    data: result,
  });
});

const getBikeBookings = catchAsync(async (req, res) => {
  const filters = pick(req.query, bikeFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await BikeRentService.getBikeBookings(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike fetch successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const BikeRentController = { bookBikeRent, getBikeBookings };
