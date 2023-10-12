import express from "express";
import { BannerController } from "./banner.controller.js";
import uploadBanner from "../../middleware/uploader/uploadBanner.js";

const router = express.Router();

router.post("/create", uploadBanner, BannerController.createBanner);

// get all users
router.get("/", BannerController.getAllBanners);

// get single user
router.get("/:id", BannerController.getSingleBanner);

// update user
router.put("/:id", BannerController.updateBanner);

// delete user
router.delete("/:id", BannerController.deleteBanner);

export const BannerRoutes = router;
