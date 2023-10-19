import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import { PrescriptionService } from "./prescription.service.js";

const addPrescription = catchAsync(async (req, res) => {
  const prescription = req.image;
  const { ...prescriptionData } = req.body;
  const data = { ...prescriptionData, prescription };
  const result = await PrescriptionService.addPrescription(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Prescription added successfully",
    data: result,
  });
});

const getAllPrescription = catchAsync(async (req, res) => {
  const result = await PrescriptionService.getAllPrescription();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Prescriptions fetched successfully",
    data: result,
  });
});

const getSinglePrescription = catchAsync(async (req, res) => {
  const result = await PrescriptionService.getSinglePrescription(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Prescription fetched successfully",
    data: result,
  });
});

export const PrescriptionController = {
  addPrescription,
  getAllPrescription,
  getSinglePrescription,
};
