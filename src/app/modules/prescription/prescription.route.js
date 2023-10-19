import express from "express";
import { PrescriptionController } from "./prescription.controller.js";
import { PrescriptionImage } from "../../middleware/uploader/uploadPrescription.js";

const router = express.Router();

router.post(
  "/add-prescription",
  PrescriptionImage.uploadImage,
  PrescriptionController.addPrescription
);

// get all prescription
router.get("/", PrescriptionController.getAllPrescription);

// get single prescription
router.get("/:id", PrescriptionController.getSinglePrescription);

export const PrescriptionRoutes = router;
