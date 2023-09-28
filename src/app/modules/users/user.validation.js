import { z } from "zod";

const registerUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    phoneNumber: z.string({
      required_error: "Local guardian contact number is required",
    }),
    password: z.string(),
    profileImage: z.string().optional(),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    password: z.string(),
  }),
});

export const UserValidation = {
  registerUserZodSchema,
  loginUserZodSchema,
};
