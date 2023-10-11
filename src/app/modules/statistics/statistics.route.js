import express from "express";
import { StatisticController } from "./statistics.controller.js";

const router = express.Router();

router.get("/", StatisticController.getStatistic);

export const StatisticRoutes = router;
