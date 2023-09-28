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

router.post(
  "/login",
  validateRequest(UserValidation.loginUserZodSchema),
  UserController.loginUser
);

// // get all users
// router.get("/", UserController.createFaculty);

// // get single user
// router.get("/:id", UserController.createFaculty);

// // update user
// router.put("/:id", UserController.createFaculty);

export const UserRoutes = router;
