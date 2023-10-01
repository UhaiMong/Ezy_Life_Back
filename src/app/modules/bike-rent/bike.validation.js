import { z } from "zod";

const bikeRentZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    nid: z.string({
      required_error: "NID number is required",
    }),
    phoneNumber: z.string({
      required_error: "Phone number is required",
    }),
    drivingLicense: z.string({
      required_error: "Driving License number is required",
    }),
    from: z.string({
      required_error: "Start destination is required",
    }),
    destination: z.string({
      required_error: "Final Destination is required",
    }),
    fuel: z.string({}).optional(),
    start_time: z.string({
      required_error: "Start time is required",
    }),
    end_time: z.string({
      required_error: "End time is required",
    }),
    rider: z.string({}).optional(),
    gender: z.string({
      required_error: "Gender is required",
    }),
    start_date: z.string({
      required_error: "Start Date is required",
    }),
    end_date: z.string({
      required_error: "End Date is required",
    }),
    bikeType: z.string({
      required_error: "Bike type is required",
    }),
    total_amount: z.number({
      required_error: "Total amount is required",
    }),
  }),
});

export const BikeRentValidation = {
  bikeRentZodSchema,
};
