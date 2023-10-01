import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { ParcelService } from "./parcel.service.js";

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

export const ParcelController = { bookParcel };
