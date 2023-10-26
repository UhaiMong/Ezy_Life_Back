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

const getBikeBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeRentService.getBikeBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch successful",
    data: result,
  });
});

const getLoggedInUserOrders = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeRentService.getLoggedInUserOrders(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch successful",
    data: result,
  });
});

const updateBikeBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeRentService.updateBikeBooking(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike rent updated successful",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeRentService.deleteBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rent deleted successful",
    data: result,
  });
});

export const BikeRentController = {
  bookBikeRent,
  getBikeBookings,
  getBikeBooking,
  updateBikeBooking,
  deleteBooking,
  getLoggedInUserOrders,
};
