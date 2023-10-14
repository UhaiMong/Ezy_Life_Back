import { z } from "zod";

const create = z.object({
  body: z.object({
    cat: z.string({
      required_error: "Category is required",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
    group: z.string({
      required_error: "Group is required",
    }),
    pharmacyName: z.string({
      required_error: "Pharmacy name is required",
    }),
    basePrice: z.number({
      required_error: "Base price is required",
    }),
    discountPrice: z.number({}).optional(),
    about: z.string({
      required_error: "About is required",
    }),
    discount: z.number({}).optional(),
    info: z.string({}).optional(),
    type: z.string({}).optional(),
    power: z.string({}).optional(),
  }),
});

export const MedicineValidation = {
  create,
};
