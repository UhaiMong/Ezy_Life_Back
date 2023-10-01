import { z } from "zod";

const blogZodSchema = z.object({
  body: z.object({
    author_name: z.string({
      required_error: "Author name is required",
    }),
    author_designation: z.string({}).optional(),
    author_img: z.string({}).optional(),
    title: z.string({
      required_error: "Title is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    image: z.string({}).optional(),
  }),
});

export const BlogValidation = {
  blogZodSchema,
};
