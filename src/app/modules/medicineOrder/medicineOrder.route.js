import express from "express";
import { MedicineOrderController } from "./medicineOrder.controller.js";

const router = express.Router();

router.post("/add-order", MedicineOrderController.addOrder);

router.get("/", MedicineOrderController.getAllOrder);

router.get("/:id", MedicineOrderController.getOrderById);

router.patch("/:id", MedicineOrderController.updateOrder);

router.delete("/:id", MedicineOrderController.deleteOrder);

export const MedicineOrderRoutes = router;
