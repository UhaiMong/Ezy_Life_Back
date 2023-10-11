import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { StatisticService } from "./statistics.service.js";

const getStatistic = catchAsync(async (req, res) => {
  const result = await StatisticService.getStatistic();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch successful",
    data: result,
  });
});

export const StatisticController = {
  getStatistic,
};
