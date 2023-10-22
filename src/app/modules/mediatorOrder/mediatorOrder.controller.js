import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { MediatorOrderService } from "./mediatorOrder.service.js";

const addOrder = catchAsync(async (req, res) => {
  const { ...orderData } = req.body;
  const result = await MediatorOrderService.addOrder(orderData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mediator Order proceed successful",
    data: result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = await MediatorOrderService.getAllOrder();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mediator Orders fetched successful",
    data: result,
  });
});

const getOrderById = catchAsync(async (req, res) => {
  const result = await MediatorOrderService.getOrderById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mediator Order fetched successful",
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await MediatorOrderService.updateOrder(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mediator Order updated successful",
    data: result,
  });
});
const deleteOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MediatorOrderService.deleteOrder(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mediator Order deleted successful",
    data: result,
  });
});

export const MediatorOrderController = {
  addOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
