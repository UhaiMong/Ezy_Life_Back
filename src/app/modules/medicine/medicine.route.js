import express from "express";
import { MedicineController } from "./medicine.controller.js";
import { MedicineImage } from "../../middleware/uploader/medicineImage.js";

const router = express.Router();

router.post(
  "/add-medicine",
  MedicineImage.uploadImage,
  MedicineController.addMedicine
);

router.get("/", MedicineController.getAllMedicine);

router.get("/:id", MedicineController.getMedicineById);

router.patch(
  "/:id",
  MedicineImage.uploadImage,
  MedicineController.updateMedicine
);

router.delete("/:id", MedicineController.deleteMedicine);

export const MedicineRoutes = router;
