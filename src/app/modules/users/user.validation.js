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
    phoneNumber: z.string({}).optional(),
    nid: z.string({}).optional(),
    drivingLicense: z.string({}).optional(),
    gender: z.string({}).optional(),
    role: z.string({}).optional(),
    profileImage: z.string().optional(),
  }),
});

export const UserValidation = {
  registerUserZodSchema,
};
