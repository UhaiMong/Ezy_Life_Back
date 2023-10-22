import express from "express";
import { StatisticController } from "./statistics.controller.js";

const router = express.Router();

router.get("/", StatisticController.getStatistic);
router.get("/daily-booking", StatisticController.getDailyBooking);
router.get("/latest-transaction", StatisticController.latestTransaction);

export const StatisticRoutes = router;
