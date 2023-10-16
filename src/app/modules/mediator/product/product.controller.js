import httpStatus from "http-status";
import { MediatorService } from "./product.service.js";
import catchAsync from "../../../../shared/catchAsync.js";
import sendResponse from "../../../../shared/sendResponse.js";
import pick from "../../../../shared/pick.js";
import { mediatorFilterableField } from "./product.constants.js";
import { paginationFields } from "../../../../constants/pagination.js";

const addProduct = catchAsync(async (req, res) => {
  const image = req.image;
  const { ...productData } = req.body;
  const product = { ...productData, image };
  const result = await MediatorService.addProduct(product);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product added successful",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const filters = pick(req.query, mediatorFilterableField);
  const options = pick(req.query, paginationFields);

  if (req.query.category) {
    filters["category.name"] = req.query.category;
  }
  const result = await MediatorService.getAllProduct(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successful",
    meta: result.meta,
    data: result.data,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const result = await MediatorService.getProductById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product fetched successful",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const image = req?.image;
  const id = req.params.id;
  const payload = image ? { ...req.body, image } : req.body;
  const result = await MediatorService.updateProduct(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products updated successful",
    data: result,
  });
});
const deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MediatorService.deleteProduct(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products deleted successful",
    data: result,
  });
});

export const MediatorController = {
  addProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
