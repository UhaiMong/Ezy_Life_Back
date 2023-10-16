import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import pick from "../../../shared/pick.js";
import { paginationFields } from "../../../constants/pagination.js";
import { OrderService } from "./order.service.js";
import { orderFilterableField } from "./orders.constants.js";

const addOrder = catchAsync(async (req, res) => {
  const { ...orderData } = req.body;
  const result = await OrderService.addOrder(orderData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order proceed successful",
    data: result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const filters = pick(req.query, orderFilterableField);
  const options = pick(req.query, paginationFields);
  const result = await OrderService.getAllOrder(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders fetched successful",
    meta: result.meta,
    data: result.data,
  });
});

const getOrderById = catchAsync(async (req, res) => {
  const result = await OrderService.getOrderById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order fetched successful",
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await OrderService.updateOrder(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order updated successful",
    data: result,
  });
});
const deleteOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await OrderService.deleteOrder(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order deleted successful",
    data: result,
  });
});

export const OrderController = {
  addOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
