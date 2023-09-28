import express from "express";
import { UserController } from "./user.controller.js";
import validateRequest from "../../middleware/validationRequest.js";
import { UserValidation } from "./user.validation.js";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidation.registerUserZodSchema),
  UserController.registerUser
);

// get all users
router.get("/", UserController.getAllUsers);

// get single user
router.get("/:id", UserController.getSingleUser);

// update user
router.put("/:id", UserController.updateUser);

// delete user
router.delete("/:id", UserController.deleteUser);

export const UserRoutes = router;
