import express from "express";
import validateRequest from "../../middleware/validationRequest.js";
import { ParcelController } from "./parcel.controller.js";
import { ParcelValidation } from "./parcel.validation.js";

const router = express.Router();

router.post(
  "/book-parcel",
  validateRequest(ParcelValidation.parcelZodSchema),
  ParcelController.bookParcel
);

export const ParcelRoutes = router;
