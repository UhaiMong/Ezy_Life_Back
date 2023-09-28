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

export const BikeRentRoutes = router;
