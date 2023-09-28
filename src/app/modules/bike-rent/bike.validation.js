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
    fuel: z.number({}).optional(),
    startTime: z.string({
      required_error: "Start time is required",
    }),
    startTime: z.string({
      required_error: "Start time is required",
    }),
    endTime: z.string({
      required_error: "Start time is required",
    }),
    rider: z.string({}).optional(),
    startDate: z.string({
      required_error: "Start Date is required",
    }),
    endDate: z.string({
      required_error: "End Date is required",
    }),
    bikeType: z.string({
      required_error: "Bike type is required",
    }),
  }),
});

export const BikeRentValidation = {
  bikeRentZodSchema,
};
