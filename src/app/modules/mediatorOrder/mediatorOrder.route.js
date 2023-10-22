import express from "express";
import { MediatorOrderController } from "./mediatorOrder.controller.js";

const router = express.Router();

router.post("/add-order", MediatorOrderController.addOrder);

router.get("/", MediatorOrderController.getAllOrder);

router.get("/:id", MediatorOrderController.getOrderById);

router.patch("/:id", MediatorOrderController.updateOrder);

router.delete("/:id", MediatorOrderController.deleteOrder);

export const MediatorOrderRoutes = router;
