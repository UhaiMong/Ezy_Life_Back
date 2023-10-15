import express from "express";
import { MediatorImage } from "../../../middleware/uploader/mediatorImage.js";
import { MediatorController } from "./product.controller.js";
const router = express.Router();

router.post(
  "/add-product",
  MediatorImage.uploadImage,
  MediatorController.addProduct
);

router.get("/", MediatorController.getAllProduct);

router.get("/:id", MediatorController.getProductById);

router.patch(
  "/:id",
  MediatorImage.uploadImage,
  MediatorController.updateProduct
);

router.delete("/:id", MediatorController.deleteProduct);

export const MediatorRoutes = router;
