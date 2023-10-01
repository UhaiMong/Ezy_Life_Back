import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    author_name: {
      type: String,
      required: true,
    },
    author_designation: {
      type: String,
    },
    author_img: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = model("Blog", blogSchema);
