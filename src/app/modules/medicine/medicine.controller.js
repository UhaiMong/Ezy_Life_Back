import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { MedicineService } from "./medicine.service.js";
import pick from "../../../shared/pick.js";
import { medicineFilterableField } from "./medicine.constants.js";
import { paginationFields } from "../../../constants/pagination.js";

const addMedicine = catchAsync(async (req, res) => {
  const img = req.image;
  const { ...medicineData } = req.body;
  const medicine = { ...medicineData, img };
  const result = await MedicineService.addMedicine(medicine);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Medicine added successful",
    data: result,
  });
});

const getAllMedicine = catchAsync(async (req, res) => {
  const filters = pick(req.query, medicineFilterableField);
  const options = pick(req.query, paginationFields);
  const result = await MedicineService.getAllMedicine(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Medicines fetched successful",
    meta: result.meta,
    data: result.data,
  });
});

const getMedicineById = catchAsync(async (req, res) => {
  const result = await MedicineService.getMedicineById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Medicine fetched successful",
    data: result,
  });
});

const updateMedicine = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await MedicineService.updateMedicine(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Medicine updated successful",
    data: result,
  });
});

export const MedicineController = {
  addMedicine,
  getAllMedicine,
  getMedicineById,
  updateMedicine,
};
