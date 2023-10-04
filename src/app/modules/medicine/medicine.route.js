import express from "express";
import { MedicineController } from "./medicine.controller.js";
import avatarUpload from "../../middleware/uploader/uploadImage.js";

const router = express.Router();

router.post("/add-medicine", avatarUpload, MedicineController.addMedicine);

router.get("/", MedicineController.getAllMedicine);

router.get("/:id", MedicineController.getMedicineById);

router.patch("/:id", avatarUpload, MedicineController.updateMedicine);

router.delete("/:id", MedicineController.deleteMedicine);

export const MedicineRoutes = router;
