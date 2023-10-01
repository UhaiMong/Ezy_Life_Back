import { z } from "zod";

const registerUserZodSchema = z.object({
  body: z.object({
    name: z.string({}).optional(),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    phoneNumber: z.string({}).optional(),
    photoURL: z.nullable().optional(),
  }),
});

export const UserValidation = {
  registerUserZodSchema,
};
