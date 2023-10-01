import { z } from "zod";

const parcelZodSchema = z.object({
  body: z.object({
    p_type: z.string({
      required_error: "Parcel type is required",
    }),
    p_weight: z.string({
      required_error: "Parcel weight is required",
    }),
    sender_name: z.string({
      required_error: "Sender name is required",
    }),
    primary_num: z.string({
      required_error: "Primary number is required",
    }),
    secondary_num: z.string({
      required_error: "Secondary number is required",
    }),
    sender_address: z.string({
      required_error: "Sender address is required",
    }),
    receiver_name: z.string({
      required_error: "Receiver name is required",
    }),
    receiver_address: z.string({
      required_error: "Receiver address is required",
    }),
    receiver_phone: z.string({
      required_error: "Receiver phone number is required",
    }),
    sending_date: z.string({
      required_error: "Sending date is required",
    }),
    total_amount: z.number({
      required_error: "Total amount is required",
    }),
  }),
});

export const ParcelValidation = {
  parcelZodSchema,
};
