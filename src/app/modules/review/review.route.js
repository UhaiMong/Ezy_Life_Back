import express from "express";
import { ReviewController } from "./review.controller.js";

const router = express.Router();

router.post("/add-review", ReviewController.addReview);

router.get("/", ReviewController.getAllReview);

router.get("/:id", ReviewController.getSingleReview);

export const ReviewRoutes = router;
