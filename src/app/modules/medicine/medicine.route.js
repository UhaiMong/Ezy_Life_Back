import express from "express";
import { MedicineController } from "./medicine.controller.js";
import avatarUpload from "../../middleware/uploader/uploadImage.js";

const router = express.Router();

router.post("/add-medicine", avatarUpload, MedicineController.addMedicine);

router.get("/", MedicineController.getAllMedicine);

export const MedicineRoutes = router;
