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

router.get("/", ParcelController.getBookedParcels);
router.get("/:id", ParcelController.getBookedParcel);
router.get("/user/:id", ParcelController.getLoggedInUserOrders);
router.patch("/:id", ParcelController.updateBookedParcel);
router.delete("/:id", ParcelController.deleteParcel);

export const ParcelRoutes = router;
