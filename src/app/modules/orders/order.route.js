import express from "express";
import { OrderController } from "./order.controller.js";

const router = express.Router();

router.post("/add-order", OrderController.addOrder);

router.get("/", OrderController.getAllOrder);

router.get("/:id", OrderController.getOrderById);

router.patch("/:id", OrderController.updateOrder);

router.delete("/:id", OrderController.deleteOrder);

export const OrderRoutes = router;
