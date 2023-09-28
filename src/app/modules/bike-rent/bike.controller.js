import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import { BikeRentService } from "./bike.service.js";
import sendResponse from "../../../shared/sendResponse.js";

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

export const BikeRentController = { bookBikeRent };
