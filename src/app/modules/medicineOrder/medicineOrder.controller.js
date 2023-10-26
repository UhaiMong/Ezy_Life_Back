import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { MedicineOrderService } from "./medicineOrder.service.js";

const addOrder = catchAsync(async (req, res) => {
  const { ...orderData } = req.body;
  const result = await MedicineOrderService.addOrder(orderData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Medicine Order proceed successful",
    data: result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = await MedicineOrderService.getAllOrder();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Medicine Orders fetched successful",
    data: result,
  });
});

const getOrderById = catchAsync(async (req, res) => {
  const result = await MedicineOrderService.getOrderById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Medicine Order fetched successful",
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await MedicineOrderService.updateOrder(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Medicine Order updated successful",
    data: result,
  });
});
const deleteOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MedicineOrderService.deleteOrder(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Medicine Order deleted successful",
    data: result,
  });
});

const getLoggedInUserOrders = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MedicineOrderService.getLoggedInUserOrders(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Medicine order fetched successful",
    data: result,
  });
});

export const MedicineOrderController = {
  addOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getLoggedInUserOrders,
};
