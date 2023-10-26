import express from "express";
import { BikeRentValidation } from "./bike.validation.js";
import { BikeRentController } from "./bike.controller.js";
import validateRequest from "../../middleware/validationRequest.js";

const router = express.Router();

router.post(
  "/book-rent",
  validateRequest(BikeRentValidation.bikeRentZodSchema),
  BikeRentController.bookBikeRent
);

router.get("/", BikeRentController.getBikeBookings);
router.get("/:id", BikeRentController.getBikeBooking);
router.patch("/:id", BikeRentController.updateBikeBooking);
router.delete("/:id", BikeRentController.deleteBooking);

export const BikeRentRoutes = router;
